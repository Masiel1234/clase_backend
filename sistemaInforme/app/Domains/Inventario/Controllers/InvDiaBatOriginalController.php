<?php

namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Request\InvDiaBatOriginalRequest;

class InvDiaBatOriginalController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaBatOriginal::query()->orderByDesc('id')->get()
        );
    }





}