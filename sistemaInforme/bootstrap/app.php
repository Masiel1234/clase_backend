<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('app/Domains/Inventario/Routes/Inventario.php'));
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('app/Domains/Dashboard/Routes/Dashboard.php'));
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('app/Domains/Marca/Routes/Marca.php'));
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('app/Domains/Proveedor/Routes/Proveedor.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
