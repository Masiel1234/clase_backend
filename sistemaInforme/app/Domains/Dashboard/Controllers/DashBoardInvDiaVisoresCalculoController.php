<?php

namespace App\Domains\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Models\InvDiaVisores;
use Illuminate\Support\Facades\DB;

class DashBoardInvDiaVisoresCalculoController extends Controller
{
    // KPIs principales del dashboard
    public function estadisticasGenerales()
    {
        $stats = InvDiaVisores::select(
            DB::raw('SUM(t_inv_final) as stock_total'),
            DB::raw('SUM(t_inv_final * cost) as valor_inventario'),
            DB::raw('COUNT(*) as total_productos'),
            DB::raw('COUNT(CASE WHEN t_inv_final <= 5 THEN 1 END) as productos_bajo_stock')
        )->first();

        return response()->json([
            'stock_total' => (int) $stats->stock_total,
            'valor_inventario' => round($stats->valor_inventario, 2),
            'total_productos' => (int) $stats->total_productos,
            'productos_bajo_stock' => (int) $stats->productos_bajo_stock,
            'porcentaje_bajo_stock' => $stats->total_productos > 0 
                ? round(($stats->productos_bajo_stock / $stats->total_productos) * 100, 2) : 0,
        ]);
    }

    // Gráfica de barras/torta por nombre
    public function stockPorNombre()
    {
        $data = InvDiaVisores::select('nombre', DB::raw('SUM(t_inv_final) as stock_total'))
            ->groupBy('nombre')
            ->orderByDesc('stock_total')
            ->get();
        
        $total = $data->sum('stock_total');

        return response()->json([
            'labels' => $data->pluck('nombre'),
            'datos' => $data->pluck('stock_total'),
            'porcentajes' => $data->map(fn($item) => $total > 0 ? round(($item->stock_total / $total) * 100, 2) : 0),
        ]);
    }

    // Tabla de alertas - productos críticos
    public function productosBajoStock()
    {
        return response()->json(
            InvDiaVisores::where('t_inv_final', '<=', 5)
                ->orderBy('t_inv_final')
                ->limit(10)
                ->get()
        );
    }

    // Productos más vendidos
    public function productosMasVendidos()
    {
        return response()->json(
            InvDiaVisores::select('id', 'nombre', 't_inv_final', 'vta', 'vxm')
                ->orderByDesc('vta')
                ->limit(10)
                ->get()
        );
    }
}
