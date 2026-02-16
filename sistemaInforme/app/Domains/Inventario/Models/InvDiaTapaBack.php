<?php

namespace App\Domains\Inventario\Models;

use Illuminate\Database\Eloquent\Model;
use App\Domains\Marca\Models\Marca;
use App\Domains\Proveedor\Models\Proveedor;

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
        'stock_minimo',
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