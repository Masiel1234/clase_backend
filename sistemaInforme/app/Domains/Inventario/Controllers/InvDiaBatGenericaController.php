<?php
namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Requests\Store\StoreInvDiaBatGenericaRequest;
use App\Domains\Inventario\Requests\Update\UpdateInvDiaBatGenericaRequest;
use App\Domains\Inventario\Models\InvDiaBatGenerica;

class InvDiaBatGenericaController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaBatGenerica::query()->orderByDesc('id')->get()
        );
    }

    public function store(StoreInvDiaBatGenericaRequest $request)
    {
        $data = $request->validated();
        $item = InvDiaBatGenerica::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateInvDiaBatGenericaRequest $request, $id)
    {
        $data = $request->validated();
        $item = InvDiaBatGenerica::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }


}