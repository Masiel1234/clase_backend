<?php

namespace App\Domains\Inventario\Controller;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Request\InvDiaVisoresRequest;
use App\Domains\Inventario\Requests\Update\UpdateInvDiaVisoresRequest;

class InvDiaVisoresController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaVisores::query()->orderByDesc('id')->get()
        );
    }

    public function store(StoreInvDiaVisoresRequest $request)
    {
        $data = $request->validated();
        $item = InvDiaVisores::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateInvDiaVisoresRequest $request, $id)
    {
        $data = $request->validated();
        $item = InvDiaVisores::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }

}