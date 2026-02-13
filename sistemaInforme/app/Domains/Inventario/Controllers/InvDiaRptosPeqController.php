<?php

namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Requests\Store\StoreInvDiaRptosPeqRequest;
use App\Domains\Inventario\Requests\Update\UpdateInvRptosPeqRequest;
use App\Domains\Inventario\Models\InvDiaRptosPeq;

class InvDiaRptosPeqController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaRptosPeq::query()->orderByDesc('id')->get()
        );
    }

    public function store(StoreInvDiaRptosPeqRequest $request)
    {
        $data = $request->validated();
        $item = InvDiaRptosPeq::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateInvRptosPeqRequest $request, $id)
    {
        $data = $request->validated();
        $item = InvDiaRptosPeq::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }


}