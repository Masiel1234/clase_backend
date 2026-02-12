<?php

namespace App\Domains\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Models\InvDiaCel;
use Illuminate\Support\Facades\DB;

class DashBoardInvDiaCelCalculoController extends Controller
{
    // KPIs principales del dashboard de celulares
    public function estadisticasGenerales()
    {
        $stats = InvDiaCel::select(
            DB::raw('COUNT(*) as total_celulares'),
            DB::raw('SUM(costo) as costo_total'),
            DB::raw('SUM(entrega) as ingresos_totales'),
            DB::raw('SUM(entrega - costo) as ganancia_total'),
            DB::raw('COUNT(CASE WHEN entrega IS NOT NULL THEN 1 END) as entregados'),
            DB::raw('COUNT(CASE WHEN entrega IS NULL THEN 1 END) as pendientes')
        )->first();

        return response()->json([
            'total_celulares' => (int) $stats->total_celulares,
            'costo_total' => round($stats->costo_total, 2),
            'ingresos_totales' => round($stats->ingresos_totales, 2),
            'ganancia_total' => round($stats->ganancia_total, 2),
            'entregados' => (int) $stats->entregados,
            'pendientes' => (int) $stats->pendientes,
            'porcentaje_entregados' => $stats->total_celulares > 0 
                ? round(($stats->entregados / $stats->total_celulares) * 100, 2) : 0,
        ]);
    }

    // Servicios más realizados
    public function serviciosMasRealizados()
    {
        $servicios = [
            'Software' => InvDiaCel::whereNotNull('software')->count(),
            'Display' => InvDiaCel::whereNotNull('display')->count(),
            'Táctil' => InvDiaCel::whereNotNull('tactil')->count(),
            'Batería' => InvDiaCel::whereNotNull('bateria')->count(),
            'Tarjeta' => InvDiaCel::whereNotNull('tarjeta')->count(),
            'Mantenimiento' => InvDiaCel::whereNotNull('mantenimiento')->count(),
        ];

        arsort($servicios);

        return response()->json([
            'labels' => array_keys($servicios),
            'datos' => array_values($servicios),
        ]);
    }

    // Gráfica por referencia
    public function celularesPorReferencia()
    {
        $data = InvDiaCel::select('referencia', DB::raw('COUNT(*) as cantidad'))
            ->groupBy('referencia')
            ->orderByDesc('cantidad')
            ->limit(10)
            ->get();

        return response()->json([
            'labels' => $data->pluck('referencia'),
            'datos' => $data->pluck('cantidad'),
        ]);
    }

    // Celulares pendientes de entrega
    public function celularesPendientes()
    {
        return response()->json(
            InvDiaCel::whereNull('entrega')
                ->orderByDesc('fecha')
                ->limit(10)
                ->get()
        );
    }

    // Análisis de rentabilidad
    public function analisisRentabilidad()
    {
        return response()->json(
            InvDiaCel::selectRaw('id, referencia, fecha, costo, entrega, 
                (entrega - costo) as margen,
                ROUND(((entrega - costo) / costo) * 100, 2) as porcentaje_margen')
                ->whereNotNull('entrega')
                ->where('entrega', '>', 0)
                ->orderByDesc('margen')
                ->limit(10)
                ->get()
        );
    }
}
