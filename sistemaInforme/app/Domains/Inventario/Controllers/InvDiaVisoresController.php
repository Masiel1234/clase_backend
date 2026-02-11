<?php

namespace App\Domains\Inventario\Controller;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Request\InvDiaVisoresRequest;

class InvDiaVisoresController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaVisores::query()->orderByDesc('id')->get()
        );
    }
}