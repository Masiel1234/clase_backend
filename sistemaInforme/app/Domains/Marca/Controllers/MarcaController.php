<?php

namespace App\Domains\Marca\Controllers;

use App\Http\Controllers\Controller;
use App\Domains\Marca\Models\Marca;
use App\Domains\Marca\Requests\Store\StoreMarcaRequest;
use App\Domains\Marca\Requests\Update\UpdateMarcaRequest;

class MarcaController extends Controller
{
    public function index()
    {
        return response()->json(
            Marca::query()->orderByDesc('id')->get()
        );
    }

    public function store(StoreMarcaRequest $request)
    {
        $data = $request->validated();
        $item = Marca::create($data);
        return response()->json($item, 201);
    }

    public function update(UpdateMarcaRequest $request, $id)
    {
        $data = $request->validated();
        $item = Marca::findOrFail($id);
        $item->update($data);
        return response()->json($item);
    }

    public function deactivate($id)
    {
        $item = Marca::findOrFail($id);
        $item->update(['activo' => false]);
        return response()->json($item);
    }
    
}