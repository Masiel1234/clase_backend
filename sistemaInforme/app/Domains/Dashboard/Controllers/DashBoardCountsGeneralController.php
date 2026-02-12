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

class DashBoardCountsGeneralController extends Controller
{
    // Resumen general para tarjetas del dashboard
    public function resumenGeneral()
    {
        return response()->json([
            [
                'nombre' => 'Baterías Genéricas',
                'cantidad' => InvDiaBatGenerica::sum('cantidad'),
                'criticos' => InvDiaBatGenerica::where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Baterías Originales',
                'cantidad' => InvDiaBatOriginal::sum('cantidad'),
                'criticos' => InvDiaBatOriginal::where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Displays',
                'cantidad' => InvDiaDisplay::sum('t_inv_final'),
                'criticos' => InvDiaDisplay::where('t_inv_final', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Táctiles',
                'cantidad' => InvDiaTactil::sum('cantidad'),
                'criticos' => InvDiaTactil::where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Tapas Back',
                'cantidad' => InvDiaTapaBack::sum('t_inv_final'),
                'criticos' => InvDiaTapaBack::where('t_inv_final', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Visores',
                'cantidad' => InvDiaVisores::sum('t_inv_final'),
                'criticos' => InvDiaVisores::where('t_inv_final', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Repuestos Pequeños',
                'cantidad' => InvDiaRptosPeq::count(),
                'criticos' => 0,
            ],
            [
                'nombre' => 'Celulares',
                'cantidad' => InvDiaCel::count(),
                'pendientes' => InvDiaCel::whereNull('entrega')->count(),
            ],
        ]);
    }
}
