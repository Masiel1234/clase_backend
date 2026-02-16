<?php
namespace App\Domains\Inventario\Models;

use Illuminate\Database\Eloquent\Model;
use App\Domains\Marca\Models\Marca;
use App\Domains\Proveedor\Models\Proveedor;

class InvDiaBatGenerica extends Model 
{
    protected $table = 'inv_dia_bat_generica';

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