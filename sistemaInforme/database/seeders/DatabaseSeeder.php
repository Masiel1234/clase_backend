<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'nombre' => 'admin',
            'password' => bcrypt('admin123'),
            'rol' => 'admin',
        ]);
        \App\Models\User::create([
            'nombre' => 'encargado',
            'password' => bcrypt('encargado123'),
            'rol' => 'encargado',
        ]);
    }
}
