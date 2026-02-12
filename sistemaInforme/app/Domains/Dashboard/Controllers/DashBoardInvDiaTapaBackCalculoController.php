<?php

namespace App\Domains\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Models\InvDiaTapaBack;
use Illuminate\Support\Facades\DB;

class DashBoardInvDiaTapaBackCalculoController extends Controller
{
    // KPIs principales del dashboard
    public function estadisticasGenerales()
    {
        $stats = InvDiaTapaBack::select(
            DB::raw('SUM(t_inv_final) as stock_total'),
            DB::raw('SUM(falta) as faltantes_total'),
            DB::raw('SUM(t_inv_final * vxm) as valor_inventario'),
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
        $data = InvDiaTapaBack::select('id_marca_fk', DB::raw('SUM(t_inv_final) as stock_total'))
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

    // Tabla de alertas - productos críticos
    public function productosBajoStock()
    {
        return response()->json(
            InvDiaTapaBack::where('t_inv_final', '<=', 5)
                ->orderBy('t_inv_final')
                ->limit(10)
                ->get()
        );
    }

    // Productos más vendidos
    public function productosMasVendidos()
    {
        return response()->json(
            InvDiaTapaBack::select('id', 'id_marca_fk', 't_inv_final', 'vta', 'vxm')
                ->orderByDesc('vta')
                ->limit(10)
                ->get()
        );
    }
}
