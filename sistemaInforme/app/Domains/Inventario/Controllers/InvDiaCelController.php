<?php

namespace App\Domains\Inventario\Controllers;

use App\Domains\Inventario\Requests\InvDiaCelRequest;


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

        public function update(Request $request, $id)
    {
        $data = $request->rules();
        $item = InvDiaCel::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }

}