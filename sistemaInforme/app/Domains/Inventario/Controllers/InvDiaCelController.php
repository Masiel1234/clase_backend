<?php

namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Requests\Store\StoreInvDiaCelRequest;
use App\Domains\Inventario\Requests\Update\UpdateInvDiaCelRequest;
use App\Domains\Inventario\Models\InvDiaCel;

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