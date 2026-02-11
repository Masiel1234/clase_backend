<?php

namespace App\Domains\Inventario\Models;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    protected $table = 'marcas';

    protected $fillable = [
        'nombre'
    ];
}