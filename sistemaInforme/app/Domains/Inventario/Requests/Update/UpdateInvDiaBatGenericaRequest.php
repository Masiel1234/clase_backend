<?php
namespace App\Domains\Inventario\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvDiaBatGenericaRequest extends FormRequest
{
	public function authorize(): bool { return true; }
	public function rules(): array
	{
		return [
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
		];
	}
}
