<?php

namespace App\Domains\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Models\InvDiaRptosPeq;
use Illuminate\Support\Facades\DB;

class DashBoardInvDiaRptosPeqCalculoController extends Controller
{
    // KPIs principales del dashboard
    public function estadisticasGenerales()
    {
        $total = InvDiaRptosPeq::count();

        return response()->json([
            'total_registros' => $total,
            'marcas_activas' => InvDiaRptosPeq::distinct('id_marca_fk')->count('id_marca_fk'),
        ]);
    }

    // Repuestos por marca
    public function repuestosPorMarca()
    {
        $data = InvDiaRptosPeq::select('id_marca_fk', DB::raw('COUNT(*) as cantidad'))
            ->groupBy('id_marca_fk')
            ->orderByDesc('cantidad')
            ->get();

        return response()->json([
            'labels' => $data->pluck('id_marca_fk'),
            'datos' => $data->pluck('cantidad'),
        ]);
    }

    // Lista de todos los repuestos
    public function listaRepuestos()
    {
        return response()->json(
            InvDiaRptosPeq::orderByDesc('id')
                ->limit(20)
                ->get()
        );
    }
}
