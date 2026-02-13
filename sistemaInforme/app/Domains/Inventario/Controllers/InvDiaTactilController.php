<?php
namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Requests\Store\StoreInvDiaTactilRequest;
use App\Domains\Inventario\Requests\Update\UpdateInvDiaTactilRequest;
use App\Domains\Inventario\Models\InvDiaTactil;

class InvDiaTactilController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaTactil::query()->orderByDesc('id')->get()
        );
    }

    public function store(StoreInvDiaTactilRequest $request)
    {
        $data = $request->validated();
        $item = InvDiaTactil::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateInvDiaTactilRequest $request, $id)
    {
        $data = $request->validated();
        $item = InvDiaTactil::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }


}
