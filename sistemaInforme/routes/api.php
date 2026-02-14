
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/prueba', function () {
    return response()->json(['ok' => true, 'msg' => 'El backend responde']);
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\AuthController;

Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando correctamente']);
});

Route::post('/login', [AuthController::class, 'login']);
