<?php
namespace App\Domains\Inventario\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Domains\Inventario\Models\InvDiaBatGenerica;

class InvDiaBatGenericaController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaBatGenerica::query()->orderByDesc('id')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id_marca_fk' => 'nullable|integer|exists:marcas,id',
            'version' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:30',
            'calidad' => 'nullable|string|max:30',
            'fecha' => 'nullable|date',
            'codigo' => 'nullable|string|max:50',
            'proveedor_id' => 'nullable|integer|exists:proveedor,id',
            'cantidad' => 'nullable|integer',
            'costo' => 'nullable|numeric',
            'v_mayor' => 'nullable|numeric',
            'rebaja' => 'nullable|numeric',
            'pedir' => 'nullable|boolean',
            'faltantes' => 'nullable|integer',
            'celulares' => 'nullable|string|max:100',
            'devolucion' => 'nullable|integer',
        ]);
        $item = InvDiaBatGenerica::create($data);
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = InvDiaBatGenerica::findOrFail($id);
        $data = $request->validate([
            'id_marca_fk' => 'nullable|integer|exists:marcas,id',
            'version' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:30',
            'calidad' => 'nullable|string|max:30',
            'fecha' => 'nullable|date',
            'codigo' => 'nullable|string|max:50',
            'proveedor_id' => 'nullable|integer|exists:proveedor,id',
            'cantidad' => 'nullable|integer',
            'costo' => 'nullable|numeric',
            'v_mayor' => 'nullable|numeric',
            'rebaja' => 'nullable|numeric',
            'pedir' => 'nullable|boolean',
            'faltantes' => 'nullable|integer',
            'celulares' => 'nullable|string|max:100',
            'devolucion' => 'nullable|integer',
        ]);
        $item->update($data);
        return response()->json($item);
    }




}