<?php

namespace App\Domains\Marca\Models;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    protected $table = 'marcas';

    protected $fillable = [
        'nombre',
        'proveedor_id',
    ];
}