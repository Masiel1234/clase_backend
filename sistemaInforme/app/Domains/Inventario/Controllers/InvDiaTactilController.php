<?php
namespace App\Domains\Inventario\Controlle;

use App\Http\Controllers\Controller;
use App\Domains\Inventario\Request\InvDiaTactilRequest;

class InvDiaTactilController extends Controller
{
    public function index()
    {
        return response()->json(
            InvDiaTactil::query()->orderByDesc('id')->get()
        );
    }

}   
