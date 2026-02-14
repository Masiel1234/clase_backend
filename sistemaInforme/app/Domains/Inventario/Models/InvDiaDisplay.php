<?php

namespace App\Domains\Inventario\Models;

use Illuminate\Database\Eloquent\Model;
use App\Domains\Marca\Models\Marca;
use App\Domains\Proveedor\Models\Proveedor;

class InvDiaDisplay extends Model
{
    protected $table = 'inv_dia_display';

   protected $fillable = [
        'id_marca_fk',
        'version',
        'color',
        'calidad',
        'r_f',
        'fecha',
        'codigo',
        'proveedor_id',
        'inventario_inicial',
        'vta',
        'ser_t',
        'dev',
        't_inv_final',
        'cost',
        'cost_venta',
        'rebaja',
        'pedir',
        'falt',
        'celular',
        'nota',
    ];

    // Relaciones
    public function marca()
    {
        return $this->belongsTo(Marca::class, 'id_marca_fk');
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }
}