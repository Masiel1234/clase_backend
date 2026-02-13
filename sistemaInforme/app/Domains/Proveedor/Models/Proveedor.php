<?php

namespace App\Domains\Proveedor\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $table = 'proveedor';

    protected $fillable = [
        'nombre',
        'contacto',
        'telefono',
        'email'
    ];
}