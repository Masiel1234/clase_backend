<?php

namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Requests\Store\StoreInvDiaBatOriginalRequest;
use App\Domains\Inventario\Requests\Update\UpdateInvDiaBatOriginalRequest;
use App\Domains\Inventario\Models\InvDiaBatOriginal;

class InvDiaBatOriginalController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaBatOriginal::with(['marca', 'proveedor'])->orderByDesc('id')->get()
        );
    }

    public function store(StoreInvDiaBatOriginalRequest $request)
    {
        $data = $request->validated();
        $item = InvDiaBatOriginal::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateInvDiaBatOriginalRequest $request, $id)
    {
        $data = $request->validated();
        $item = InvDiaBatOriginal::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }


}