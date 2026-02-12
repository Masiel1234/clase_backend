<?php
namespace App\Domains\Inventario\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvRptosPeqRequest extends FormRequest
{
	public function authorize(): bool { return true; }
	public function rules(): array
	{
		return [
			'id_marca_fk' => 'nullable|integer|exists:marcas,id',
			'v3' => 'nullable|integer',
			'v8' => 'nullable|integer',
			'tc' => 'nullable|integer',
			'tablet' => 'nullable|integer',
			'chinos' => 'nullable|integer',
			'mic_dig' => 'nullable|integer',
			'power' => 'nullable|integer',
			'audio' => 'nullable|integer',
			'conector_carga' => 'nullable|integer',
			'lector_huella' => 'nullable|integer',
			'auricular' => 'nullable|integer',
			'parlante' => 'nullable|integer',
			'logic_carga' => 'nullable|integer',
			'home' => 'nullable|integer',
			'delantera_visor' => 'nullable|integer',
			'trasera_visor' => 'nullable|integer',
			'antena' => 'nullable|integer',
			'porta_sim' => 'nullable|integer',
			'boton_lateral' => 'nullable|integer',
		];
	}
}
