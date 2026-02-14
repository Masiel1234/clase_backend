<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Datos inválidos'], 422);
        }

        $user = User::where('nombre', $request->nombre)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        // Aquí podrías generar un token si usas Sanctum/JWT, pero para simple login:
        return response()->json([
            'id' => $user->id,
            'nombre' => $user->nombre,
            'rol' => $user->rol,
        ]);
    }
}
