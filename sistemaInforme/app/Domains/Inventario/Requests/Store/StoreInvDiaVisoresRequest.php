<?php

namespace App\Domains\Inventario\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;


class StoreInvDiaVisoresRequest extends FormRequest
{

    public function authorize(): bool {return true;}

    public function rules(): array
    {
        return [
            'nombre' => 'nullable|string|max:100',
            'sin_oca' => 'nullable|boolean',
            'color' => 'nullable|string|max:30',
            'fecha' => 'nullable|date',
            'codigo' => 'nullable|string|max:50',
            'proveedor_id' => 'nullable|integer|exists:proveedor,id',
            'inventario_inicial' => 'nullable|integer',
            'comp' => 'nullable|integer',
            't_ext' => 'nullable|integer',
            'vta' => 'nullable|integer',
            'ser_t' => 'nullable|integer',
            'dev' => 'nullable|integer',
            't_inv_final' => 'nullable|integer',
            'cost' => 'nullable|numeric',
            'vxm' => 'nullable|numeric',
            'rebaja' => 'nullable|numeric',
            'pedir' => 'nullable|boolean',
            'celular' => 'nullable|string|max:100',
            'nota' => 'nullable|string',
        ];

    }



}