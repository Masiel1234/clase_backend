<?php

namespace App\Domains\Proveedor\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $table = 'proveedores';

    protected $illable = [
        'nombre',
        'contacto',
        'telefono',
        'email'
    ];
}