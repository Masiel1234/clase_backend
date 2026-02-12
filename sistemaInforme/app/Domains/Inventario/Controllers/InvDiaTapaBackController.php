<?php

namespace App\Domains\Inventario\Controller;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Request\InvDiaTapaBackRequest ;
use App\Domains\Inventario\Requests\Update\UpdateInvTapaBackRequest;

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