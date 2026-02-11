<?php

namespace App\Domains\Inventario\Models;

use Illuminate\Database\Eloquent\Model;

class InvDiaTapaBack extends Model
{
    protected $table = 'inv_dia_tapa_back';

     protected $fillable = [
        'id_marca_fk',
        'fecha',
        'codigo',
        'proveedor_id',
        'inventario_inicial',
        'comp',
        't_ext',
        'vta',
        'ser_t',
        'devolucion',
        't_inv_final',
        'vxm',
        'rebaja',
        'pedir',
        'falta',
        'celular',
        'nota',
    ];
}