<?php

namespace App\Domains\Inventario\Controllers;

use App\Domains\Inventario\Requests\InvDiaCelRequest;
use App\Domains\Inventario\Requests\Update\UpdateInvDiaCelRequestRequest;


class InvDiaCelController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaCel::query()->orderByDesc('id')->get()
        );
    }
    
    public function store(StoreInvDiaCelRequest $request)
    {
        $data = $request->validated();
        $item = InvDiaCel::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateInvDiaCelRequestRequest $request, $id)
    {
        $data = $request->validated();
        $item = InvDiaCel::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }

}