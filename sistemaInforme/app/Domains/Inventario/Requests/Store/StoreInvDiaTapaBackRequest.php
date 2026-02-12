<?php

namespace App\Domains\Inventario\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvDiaTapaBackRequest extends FormRequest
{
    public function rules(): array
    {
       return [
            'id_marca_fk' => 'nullable|integer|exists:marcas,id',
            'fecha' => 'nullable|date',
            'codigo' => 'nullable|string|max:50',
            'proveedor_id' => 'nullable|integer|exists:proveedor,id',
            'inventario_inicial' => 'nullable|integer',
            'comp' => 'nullable|integer',
            't_ext' => 'nullable|integer',
            'vta' => 'nullable|integer',
            'ser_t' => 'nullable|integer',
            'devolucion' => 'nullable|integer',
            't_inv_final' => 'nullable|integer',
            'vxm' => 'nullable|numeric',
            'rebaja' => 'nullable|numeric',
            'pedir' => 'nullable|boolean',
            'falta' => 'nullable|boolean',
            'celular' => 'nullable|string|max:100',
            'nota' => 'nullable|string',
        ];
    }
}   