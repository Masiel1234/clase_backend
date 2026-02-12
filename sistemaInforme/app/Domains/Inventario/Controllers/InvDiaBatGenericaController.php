<?php
namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Request\InvDiaBatGenericaRequest;

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

    public function update(Request $request, $id)
    {
        $data = $request->validated();
        $item = InvDiaBatGenerica::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }


}