<?php
namespace App\Domains\Inventario\Models;

use Illuminate\Database\Eloquent\Model;

class InvDiaCel extends Model
{
    protected $table = 'inv_dia_cel';

    protected $fillable = [
        'fecha',
        'costo',
        'referencia',
        'software',
        'tarjeta',
        'display',
        'tactil',
        'visor',
        'bateria',
        'boton',
        'ping',
        'cam_tapas',
        'bcver',
        'mantenimiento',
        'logica',
        'entrega',
        'abonos',
        'fecha_entrega_pago',
        'no_entrega_o_garantia',
        'devolucion',
        'terceros_comentos',
        'stock_minimo',
    ];
}