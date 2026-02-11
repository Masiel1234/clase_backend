<?php

namespace App\Domains\Inventario\Controller;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Request\InvDiaDisplayRequest;



class InvDiaDisplayController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaDisplay::query()->orderByDesc('id')->get()
        );
    }
}