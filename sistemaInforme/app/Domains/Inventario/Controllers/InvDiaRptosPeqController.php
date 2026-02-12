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

    public function store(Request $request)
    {
    $data = $request->rules();
        $item = InvDiaRptosPeq::create($data);
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->rules();
        $item = InvDiaRptosPeq::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }


}