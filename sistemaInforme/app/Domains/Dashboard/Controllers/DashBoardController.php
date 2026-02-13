<?php

namespace App\Domains\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Models\InvDiaBatGenerica;
use App\Domains\Inventario\Models\InvDiaBatOriginal;
use App\Domains\Inventario\Models\InvDiaCel;
use App\Domains\Inventario\Models\InvDiaDisplay;
use App\Domains\Inventario\Models\InvDiaTactil;
use App\Domains\Inventario\Models\InvDiaTapaBack;
use App\Domains\Inventario\Models\InvDiaVisores;
use App\Domains\Inventario\Models\InvDiaRptosPeq;
use Illuminate\Support\Facades\DB;

class DashBoardController extends Controller
{
    /**
     * Resumen completo del dashboard - TODO EN UNA SOLA PETICIÓN
     * Incluye: counts, stock bajo, estadísticas por marca, inventario diario, gráficos y alertas
     */
    public function resumenCompleto()
    {
        return response()->json([
            'counts' => $this->obtenerCounts(),
            'stock_bajo' => $this->obtenerStockBajo(),
            'estadisticas_marcas' => $this->obtenerEstadisticasMarcas(),
            'inventario_diario' => $this->obtenerInventarioDiario(),
            'graficos' => $this->obtenerGraficos(),
            'alertas' => $this->obtenerAlertas(),
        ]);
    }

    /**
     * Counts generales para las tarjetas superiores del dashboard
     */
    public function obtenerCounts()
    {
        return [
            [
                'nombre' => 'Celulares',
                'cantidad' => InvDiaCel::count(),
                'pendientes' => InvDiaCel::whereNull('entrega')->count(),
            ],
            [
                'nombre' => 'Visores',
                'cantidad' => InvDiaVisores::sum('t_inv_final') ?? 0,
                'criticos' => InvDiaVisores::where('t_inv_final', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Displays',
                'cantidad' => InvDiaDisplay::sum('t_inv_final') ?? 0,
                'criticos' => InvDiaDisplay::where('t_inv_final', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Baterías Genéricas',
                'cantidad' => InvDiaBatGenerica::sum('cantidad') ?? 0,
                'criticos' => InvDiaBatGenerica::where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Baterías Originales',
                'cantidad' => InvDiaBatOriginal::sum('cantidad') ?? 0,
                'criticos' => InvDiaBatOriginal::where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Táctiles',
                'cantidad' => InvDiaTactil::sum('cantidad') ?? 0,
                'criticos' => InvDiaTactil::where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Tapas Back',
                'cantidad' => InvDiaTapaBack::sum('t_inv_final') ?? 0,
                'criticos' => InvDiaTapaBack::where('t_inv_final', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Repuestos Pequeños',
                'cantidad' => InvDiaRptosPeq::count(),
                'criticos' => 0,
            ],
        ];
    }

    /**
     * Productos con stock bajo (críticos) - Para tabla de alertas
     */
    public function obtenerStockBajo()
    {
        $stockBajo = [];

        // Baterías Genéricas
        $batGenericas = InvDiaBatGenerica::where('cantidad', '<=', 5)
            ->orderBy('cantidad')
            ->limit(5)
            ->get()
            ->map(fn($item) => [
                'tipo' => 'Batería Genérica',
                'referencia' => $item->version ?? 'Sin versión',
                'stock' => $item->cantidad,
                'marca_id' => $item->id_marca_fk,
            ]);

        // Displays
        $displays = InvDiaDisplay::where('t_inv_final', '<=', 5)
            ->orderBy('t_inv_final')
            ->limit(5)
            ->get()
            ->map(fn($item) => [
                'tipo' => 'Display',
                'referencia' => $item->version ?? 'Sin versión',
                'stock' => $item->t_inv_final,
                'marca_id' => $item->id_marca_fk,
            ]);

        // Táctiles
        $tactiles = InvDiaTactil::where('cantidad', '<=', 5)
            ->orderBy('cantidad')
            ->limit(5)
            ->get()
            ->map(fn($item) => [
                'tipo' => 'Táctil',
                'referencia' => $item->version ?? 'Sin versión',
                'stock' => $item->cantidad,
                'marca_id' => $item->id_marca_fk,
            ]);

        // Combinar y ordenar por stock más bajo
        $stockBajo = $batGenericas->concat($displays)->concat($tactiles)
            ->sortBy('stock')
            ->take(10)
            ->values();

        return $stockBajo;
    }

    /**
     * Estadísticas por marca - Para gráfica de torta/pie
     */
    public function obtenerEstadisticasMarcas()
    {
        // Consolidar stock por marca de todos los módulos
        $marcas = [];

        // Baterías Genéricas
        $batGenericas = InvDiaBatGenerica::select('id_marca_fk', DB::raw('SUM(cantidad) as total'))
            ->groupBy('id_marca_fk')
            ->get();

        foreach ($batGenericas as $item) {
            $marcaId = $item->id_marca_fk ?? 'Sin marca';
            if (!isset($marcas[$marcaId])) {
                $marcas[$marcaId] = 0;
            }
            $marcas[$marcaId] += $item->total;
        }

        // Displays
        $displays = InvDiaDisplay::select('id_marca_fk', DB::raw('SUM(t_inv_final) as total'))
            ->groupBy('id_marca_fk')
            ->get();

        foreach ($displays as $item) {
            $marcaId = $item->id_marca_fk ?? 'Sin marca';
            if (!isset($marcas[$marcaId])) {
                $marcas[$marcaId] = 0;
            }
            $marcas[$marcaId] += $item->total;
        }

        // Táctiles
        $tactiles = InvDiaTactil::select('id_marca_fk', DB::raw('SUM(cantidad) as total'))
            ->groupBy('id_marca_fk')
            ->get();

        foreach ($tactiles as $item) {
            $marcaId = $item->id_marca_fk ?? 'Sin marca';
            if (!isset($marcas[$marcaId])) {
                $marcas[$marcaId] = 0;
            }
            $marcas[$marcaId] += $item->total;
        }

        // Convertir a formato de gráfica
        $total = array_sum($marcas);
        $labels = [];
        $datos = [];
        $porcentajes = [];

        foreach ($marcas as $marcaId => $cantidad) {
            $labels[] = $marcaId;
            $datos[] = $cantidad;
            $porcentajes[] = $total > 0 ? round(($cantidad / $total) * 100, 2) : 0;
        }

        return [
            'labels' => $labels,
            'datos' => $datos,
            'porcentajes' => $porcentajes,
        ];
    }

    /**
     * Inventario diario - Últimos registros de celulares
     */
    public function obtenerInventarioDiario()
    {
        return InvDiaCel::orderByDesc('fecha')
            ->limit(10)
            ->get()
            ->map(fn($item) => [
                'referencia' => $item->referencia,
                'costo' => $item->costo,
                'software' => $item->software,
                'fecha' => $item->fecha,
            ]);
    }

    /**
     * Gráficos adicionales para el dashboard
     */
    public function obtenerGraficos()
    {
        return [
            'stock_por_categoria' => $this->graficoStockPorCategoria(),
            'tendencia_inventario' => $this->graficoTendenciaInventario(),
            'comparativa_costos' => $this->graficoComparativaCostos(),
            'productos_mas_criticos' => $this->graficoProductosCriticos(),
        ];
    }

    /**
     * Gráfico de barras: Stock por categoría de producto
     */
    private function graficoStockPorCategoria()
    {
        return [
            'labels' => [
                'Baterías Genéricas',
                'Baterías Originales',
                'Displays',
                'Táctiles',
                'Tapas Back',
                'Visores',
            ],
            'datos' => [
                InvDiaBatGenerica::sum('cantidad') ?? 0,
                InvDiaBatOriginal::sum('cantidad') ?? 0,
                InvDiaDisplay::sum('t_inv_final') ?? 0,
                InvDiaTactil::sum('cantidad') ?? 0,
                InvDiaTapaBack::sum('t_inv_final') ?? 0,
                InvDiaVisores::sum('t_inv_final') ?? 0,
            ],
        ];
    }

    /**
     * Gráfico de línea: Tendencia de inventario en los últimos 7 días
     */
    private function graficoTendenciaInventario()
    {
        $ultimos7Dias = [];
        $labels = [];
        
        for ($i = 6; $i >= 0; $i--) {
            $fecha = now()->subDays($i)->format('Y-m-d');
            $labels[] = now()->subDays($i)->format('d M');
            
            // Contar celulares registrados en esa fecha
            $ultimos7Dias[] = InvDiaCel::whereDate('fecha', $fecha)->count();
        }

        return [
            'labels' => $labels,
            'datos' => $ultimos7Dias,
        ];
    }

    /**
     * Gráfico de barras horizontales: Comparativa de costos por categoría
     */
    private function graficoComparativaCostos()
    {
        return [
            'labels' => ['Baterías Gen.', 'Displays', 'Táctiles', 'Visores'],
            'datos' => [
                round(InvDiaBatGenerica::sum(DB::raw('cantidad * costo')) ?? 0, 2),
                round(InvDiaDisplay::sum(DB::raw('t_inv_final * cost')) ?? 0, 2),
                round(InvDiaTactil::sum(DB::raw('cantidad * costo')) ?? 0, 2),
                round(InvDiaVisores::sum(DB::raw('t_inv_final * cost')) ?? 0, 2),
            ],
        ];
    }

    /**
     * Gráfico de barras: Top 10 productos más críticos (menor stock)
     */
    private function graficoProductosCriticos()
    {
        $criticos = InvDiaBatGenerica::where('cantidad', '<=', 5)
            ->orderBy('cantidad')
            ->limit(10)
            ->get(['version', 'cantidad']);

        return [
            'labels' => $criticos->pluck('version')->toArray(),
            'datos' => $criticos->pluck('cantidad')->toArray(),
        ];
    }

    /**
     * Sistema de alertas categorizado por severidad
     */
    public function obtenerAlertas()
    {
        $alertas = [];

        // ALERTAS CRÍTICAS (Stock = 0 o <= 2)
        $criticasBat = InvDiaBatGenerica::where('cantidad', '<=', 2)
            ->get()
            ->map(fn($item) => [
                'tipo' => 'critica',
                'categoria' => 'Batería Genérica',
                'mensaje' => "Stock crítico: {$item->version}",
                'stock_actual' => $item->cantidad,
                'accion_requerida' => 'Ordenar urgente',
                'proveedor_id' => $item->proveedor_id,
            ]);

        $criticasDisplay = InvDiaDisplay::where('t_inv_final', '<=', 2)
            ->get()
            ->map(fn($item) => [
                'tipo' => 'critica',
                'categoria' => 'Display',
                'mensaje' => "Stock crítico: {$item->version}",
                'stock_actual' => $item->t_inv_final,
                'accion_requerida' => 'Ordenar urgente',
                'proveedor_id' => $item->proveedor_id,
            ]);

        // ALERTAS DE ADVERTENCIA (Stock <= 5)
        $advertenciaBat = InvDiaBatGenerica::whereBetween('cantidad', [3, 5])
            ->get()
            ->map(fn($item) => [
                'tipo' => 'advertencia',
                'categoria' => 'Batería Genérica',
                'mensaje' => "Stock bajo: {$item->version}",
                'stock_actual' => $item->cantidad,
                'accion_requerida' => 'Revisar inventario',
                'proveedor_id' => $item->proveedor_id,
            ]);

        $advertenciaDisplay = InvDiaDisplay::whereBetween('t_inv_final', [3, 5])
            ->get()
            ->map(fn($item) => [
                'tipo' => 'advertencia',
                'categoria' => 'Display',
                'mensaje' => "Stock bajo: {$item->version}",
                'stock_actual' => $item->t_inv_final,
                'accion_requerida' => 'Revisar inventario',
                'proveedor_id' => $item->proveedor_id,
            ]);

        // ALERTAS DE CELULARES PENDIENTES
        $celularesPendientes = InvDiaCel::whereNull('entrega')
            ->where('fecha', '<', now()->subDays(7))
            ->get()
            ->map(fn($item) => [
                'tipo' => 'advertencia',
                'categoria' => 'Celular',
                'mensaje' => "Reparación pendiente: {$item->referencia}",
                'dias_pendiente' => now()->diffInDays($item->fecha),
                'accion_requerida' => 'Contactar cliente',
                'costo' => $item->costo,
            ]);

        // Combinar todas las alertas
        $alertas = $criticasBat
            ->concat($criticasDisplay)
            ->concat($advertenciaBat)
            ->concat($advertenciaDisplay)
            ->concat($celularesPendientes);

        return [
            'total' => $alertas->count(),
            'criticas' => $alertas->where('tipo', 'critica')->count(),
            'advertencias' => $alertas->where('tipo', 'advertencia')->count(),
            'alertas' => $alertas->sortByDesc('tipo')->values()->take(20), // Top 20 alertas
        ];
    }

    // ========================================
    // ENDPOINTS INDIVIDUALES (OPCIONAL)
    // ========================================

    /**
     * Solo counts - Si necesitas actualizar solo las tarjetas
     */
    public function counts()
    {
        return response()->json($this->obtenerCounts());
    }

    /**
     * Solo stock bajo - Si necesitas actualizar solo la tabla de alertas
     */
    public function stockBajo()
    {
        return response()->json($this->obtenerStockBajo());
    }

    /**
     * Solo estadísticas por marca - Si necesitas actualizar solo la gráfica
     */
    public function estadisticasMarcas()
    {
        return response()->json($this->obtenerEstadisticasMarcas());
    }

    /**
     * Solo inventario diario - Si necesitas actualizar solo la tabla
     */
    public function inventarioDiario()
    {
        return response()->json($this->obtenerInventarioDiario());
    }

    /**
     * Solo gráficos - Si necesitas actualizar solo las gráficas
     */
    public function graficos()
    {
        return response()->json($this->obtenerGraficos());
    }

    /**
     * Solo alertas - Si necesitas actualizar solo el sistema de alertas
     */
    public function alertas()
    {
        return response()->json($this->obtenerAlertas());
    }
}
