<?php

namespace App\Domains\Proveedor\Request\Store;

use Illuminate\Foundation\Http\FormRequest;

class StoreProveedorRequest extends FormRequest 
{
    public function authorize() {return true;}

    public function rules()
    {
        return [
            'nombre' => 'required|string|max:255',
            'direccion' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'contacto' => 'nullable|string|max:255',
        ];
    }

}