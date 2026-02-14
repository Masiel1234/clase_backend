<?php

namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Requests\Store\StoreInvDiaDisplayRequest;
use App\Domains\Inventario\Requests\Update\UpdateInvDiaDisplayRequest;
use App\Domains\Inventario\Models\InvDiaDisplay;

class InvDiaDisplayController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaDisplay::with(['marca', 'proveedor'])->orderByDesc('id')->get()
        );
    }

    public function store(StoreInvDiaDisplayRequest $request)
    {
        $data = $request->validated();
        $item = InvDiaDisplay::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateInvDiaDisplayRequest $request, $id)
    {
        $data = $request->validated();
        $item = InvDiaDisplay::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }

}