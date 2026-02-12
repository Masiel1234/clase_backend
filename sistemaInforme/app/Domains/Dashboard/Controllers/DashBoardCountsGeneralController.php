<?php

namespace App\Domains\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DashBoardCountsGeneralController extends Controller
{
    // Resumen general para tarjetas del dashboard
    public function resumenGeneral()
    {
        return response()->json([
            [
                'nombre' => 'Baterías Genéricas',
                'cantidad' => DB::table('inv_dia_bat_generica')->sum('cantidad'),
                'criticos' => DB::table('inv_dia_bat_generica')->where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Baterías Originales',
                'cantidad' => DB::table('inv_dia_bat_original')->sum('cantidad'),
                'criticos' => DB::table('inv_dia_bat_original')->where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Displays',
                'cantidad' => DB::table('inv_dia_display')->sum('cantidad'),
                'criticos' => DB::table('inv_dia_display')->where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Táctiles',
                'cantidad' => DB::table('inv_dia_tactil')->sum('cantidad'),
                'criticos' => DB::table('inv_dia_tactil')->where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Tapas Back',
                'cantidad' => DB::table('inv_dia_tapa_back')->sum('cantidad'),
                'criticos' => DB::table('inv_dia_tapa_back')->where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Visores',
                'cantidad' => DB::table('inv_dia_visores')->sum('cantidad'),
                'criticos' => DB::table('inv_dia_visores')->where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Repuestos Pequeños',
                'cantidad' => DB::table('inv_rptos_peq')->sum('cantidad'),
                'criticos' => DB::table('inv_rptos_peq')->where('cantidad', '<=', 5)->count(),
            ],
            [
                'nombre' => 'Celulares',
                'cantidad' => DB::table('inv_dia_cel')->count(),
                'pendientes' => DB::table('inv_dia_cel')->whereNull('entrega')->count(),
            ],
        ]);
    }
}
