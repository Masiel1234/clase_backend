<?php

namespace App\Domains\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Models\InvDiaDisplay;
use Illuminate\Support\Facades\DB;

class DashBoardInvDiaDisplayCalculoController extends Controller
{
    // KPIs principales del dashboard
    public function estadisticasGenerales()
    {
        $stats = InvDiaDisplay::select(
            DB::raw('SUM(t_inv_final) as stock_total'),
            DB::raw('SUM(falt) as faltantes_total'),
            DB::raw('SUM(t_inv_final * cost) as valor_inventario'),
            DB::raw('COUNT(*) as total_productos'),
            DB::raw('COUNT(CASE WHEN t_inv_final <= 5 THEN 1 END) as productos_bajo_stock')
        )->first();

        return response()->json([
            'stock_total' => (int) $stats->stock_total,
            'faltantes_total' => (int) $stats->faltantes_total,
            'valor_inventario' => round($stats->valor_inventario, 2),
            'total_productos' => (int) $stats->total_productos,
            'productos_bajo_stock' => (int) $stats->productos_bajo_stock,
            'porcentaje_bajo_stock' => $stats->total_productos > 0 
                ? round(($stats->productos_bajo_stock / $stats->total_productos) * 100, 2) : 0,
        ]);
    }

    // Gráfica de barras/torta por marca
    public function stockPorMarca()
    {
        $data = InvDiaDisplay::select('id_marca_fk', DB::raw('SUM(t_inv_final) as stock_total'))
            ->groupBy('id_marca_fk')
            ->orderByDesc('stock_total')
            ->get();
        
        $total = $data->sum('stock_total');

        return response()->json([
            'labels' => $data->pluck('id_marca_fk'),
            'datos' => $data->pluck('stock_total'),
            'porcentajes' => $data->map(fn($item) => $total > 0 ? round(($item->stock_total / $total) * 100, 2) : 0),
        ]);
    }

    // Gráfica de torta por calidad
    public function stockPorCalidad()
    {
        $data = InvDiaDisplay::select('calidad', DB::raw('SUM(t_inv_final) as stock_total'))
            ->groupBy('calidad')
            ->orderByDesc('stock_total')
            ->get();
        
        $total = $data->sum('stock_total');

        return response()->json([
            'labels' => $data->pluck('calidad'),
            'datos' => $data->pluck('stock_total'),
            'porcentajes' => $data->map(fn($item) => $total > 0 ? round(($item->stock_total / $total) * 100, 2) : 0),
        ]);
    }

    // Tabla de alertas - productos críticos
    public function productosBajoStock()
    {
        return response()->json(
            InvDiaDisplay::where('t_inv_final', '<=', 5)
                ->orderBy('t_inv_final')
                ->limit(10)
                ->get()
        );
    }

    // Gráfica de márgenes de rentabilidad
    public function analisisRentabilidad()
    {
        return response()->json(
            InvDiaDisplay::selectRaw('id, id_marca_fk, version, t_inv_final as cantidad, cost as costo, cost_venta, 
                (cost_venta - cost) as margen,
                ROUND(((cost_venta - cost) / cost) * 100, 2) as porcentaje_margen')
                ->where('t_inv_final', '>', 0)
                ->orderByDesc('margen')
                ->limit(10)
                ->get()
        );
    }
}
