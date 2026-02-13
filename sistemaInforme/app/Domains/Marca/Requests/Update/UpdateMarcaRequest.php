<?php

namespace App\Domains\Marca\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMarcaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255',
        ];
    }
}