<?php

namespace App\Domains\Inventario\Models;

use Illuminate\Database\Eloquent\Model;
use App\Domains\Marca\Models\Marca;

class InvDiaRptosPeq extends Model
{
    protected $table = 'inv_dia_rptos_peq';

    protected $fillable = [
        'id_marca_fk',
        'v3',
        'v8',
        'tc',
        'tablet',
        'chinos',
        'mic_dig',
        'power',
        'audio',
        'conector_carga',
        'lector_huella',
        'auricular',
        'parlante',
        'logic_carga',
        'home',
        'delantera_visor',
        'trasera_visor',
        'antena',
        'porta_sim',
        'boton_lateral',
        'stock_minimo',
    ];

    // Relaciones
    public function marca()
    {
        return $this->belongsTo(Marca::class, 'id_marca_fk');
    }
}