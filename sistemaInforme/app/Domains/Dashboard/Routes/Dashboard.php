<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Dashboard\Controllers\DashBoardController;

Route::prefix('dashboard')->group(function () {
	// ÚNICO ENDPOINT: TODO EN UNA SOLA PETICIÓN
	Route::get('resumen-completo', [DashBoardController::class, 'resumenCompleto']);
});
