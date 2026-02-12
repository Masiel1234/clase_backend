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

        public function store(Request $request)
    {
    $data = $request->rules();
        $item = InvDiaDisplay::create($data);
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->rules();
        $item = InvDiaDisplay::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }

}