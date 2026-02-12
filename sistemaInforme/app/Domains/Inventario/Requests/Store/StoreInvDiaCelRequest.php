<?php
namespace App\Domains\Inventario\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvDiaCelRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

     public function rules(): array
    {
        return [
            'fecha' => 'required|date',
            'costo' => 'nullable|numeric',
            'referencia' => 'nullable|string|max:100',
            'software' => 'nullable|string|max:50',
            'tarjeta' => 'nullable|string|max:50',
            'display' => 'nullable|string|max:50',
            'tactil' => 'nullable|string|max:50',
            'visor' => 'nullable|string|max:50',
            'bateria' => 'nullable|string|max:50',
            'boton' => 'nullable|string|max:50',
            'ping' => 'nullable|string|max:50',
            'cam_tapas' => 'nullable|string|max:50',
            'bcver' => 'nullable|string|max:50',
            'mantenimiento' => 'nullable|string|max:50',
            'logica' => 'nullable|string|max:50',
            'entrega' => 'nullable|string|max:50',
            'abonos' => 'nullable|numeric',
            'fecha_entrega_pago' => 'nullable|date',
            'no_entrega_o_garantia' => 'nullable|string|max:100',
            'devolucion' => 'nullable|string|max:50',
            'terceros_comentos' => 'nullable|string',
        ];
    }


}
