<?php
namespace App\Domains\Proveedor\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Proveedor\Request\Store\StoreProveedorRequest;
use App\Domains\Proveedor\Request\Update\UpdateProveedorRequest;
use App\Domains\Proveedor\Models\Proveedor;

class ProveedorController extends Controller
{
    public function index()
    {
        return response()->json(
            Proveedor::query()->orderByDesc('id')->get()
        );
    }

    public function store(StoreProveedorRequest $request)
    {
        $data = $request->validated();
        $item = Proveedor::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateProveedorRequest $request, $id)
    {
        $data = $request->validated();
        $item = Proveedor::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }

    public function deactivate($id)
    {
        $item = Proveedor::findOrFail($id);
        $item->update(['activo' => false]);
        return response()->json($item);
    }



}