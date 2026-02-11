<?php

namespace App\Domains\Inventario\Controller;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Request\InvDiaRptosPeqRequest;

class InvDiaRptosPeqController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaRptosPeq::query()->orderByDesc('id')->get()
        );
    }
}