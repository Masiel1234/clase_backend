<?php
 
namespace App\Domains\Inventario\Models;

use Illuminate\Database\Eloquent\Model;

class InvDiaVisores extends Model
{
    protected $table = 'inv_dia_visores';

     protected $fillable = [
        'nombre',
        'sin_oca',
        'color',
        'fecha',
        'codigo',
        'proveedor_id',
        'inventario_inicial',
        'comp',
        't_ext',
        'vta',
        'ser_t',
        'dev',
        't_inv_final',
        'cost',
        'vxm',
        'rebaja',
        'pedir',
        'celular',
        'nota',
        'stock_minimo',
    ];

}