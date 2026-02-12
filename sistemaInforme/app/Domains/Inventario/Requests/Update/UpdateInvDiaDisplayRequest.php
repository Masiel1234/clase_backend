<?php
namespace App\Domains\Inventario\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvDiaDisplayRequest extends FormRequest
{
	public function authorize(): bool { return true; }
	public function rules(): array
	{
		return [
			'id_marca_fk' => 'nullable|integer|exists:marcas,id',
			'version' => 'nullable|string|max:50',
			'color' => 'nullable|string|max:30',
			'calidad' => 'nullable|string|max:30',
			'r_f' => 'nullable|string|max:30',
			'fecha' => 'nullable|date',
			'codigo' => 'nullable|string|max:50',
			'proveedor_id' => 'nullable|integer|exists:proveedor,id',
			'inventario_inicial' => 'nullable|integer',
			'vta' => 'nullable|integer',
			'ser_t' => 'nullable|integer',
			'dev' => 'nullable|integer',
			't_inv_final' => 'nullable|integer',
			'cost' => 'nullable|numeric',
			'cost_venta' => 'nullable|numeric',
			'rebaja' => 'nullable|numeric',
			'pedir' => 'nullable|boolean',
			'falt' => 'nullable|boolean',
			'celular' => 'nullable|string|max:100',
			'nota' => 'nullable|string',
		];
	}
}
