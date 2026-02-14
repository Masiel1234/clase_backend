<?php

namespace App\Domains\Marca\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class StoreMarcaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255',
            'proveedor_id' => 'required|integer|exists:proveedor,id',
        ];
    }
}