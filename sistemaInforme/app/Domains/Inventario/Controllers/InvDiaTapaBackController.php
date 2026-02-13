<?php

namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Requests\Store\StoreInvDiaTapaBackRequest;
use App\Domains\Inventario\Requests\Update\UpdateInvTapaBackRequest;
use App\Domains\Inventario\Models\InvDiaTapaBack;

class InvDiaTapaBackController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaTapaBack::query()->orderByDesc('id')->get()
        );
    }

    public function store(StoreInvDiaTapaBackRequest $request)
    {
        $data = $request->validated();
        $item = InvDiaTapaBack::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateInvTapaBackRequest $request, $id)
    {
        $data = $request->validated();
        $item = InvDiaTapaBack::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }


}