<?php

namespace App\Domains\Inventario\Models;

use Illuminate\Database\Eloquent\Model;

class InvDiaTactil extends Model
{
    protected $table = 'inv_dia_tactil';

    protected $fillable = [
        'id_marca_fk',
        'version',
        'color',
        'calidad',
        'fecha',
        'codigo',
        'proveedor_id',
        'cantidad',
        'costo',
        'v_mayor',
        'rebaja',
        'pedir',
        'faltantes',
        'celulares',
        'devolucion',
    ];
}