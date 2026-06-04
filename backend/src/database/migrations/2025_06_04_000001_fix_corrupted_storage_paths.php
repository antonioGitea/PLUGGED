<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Ejecutar la migración.
     *
     * Limpia datos corruptos donde las rutas se guardaron como "storage/..."
     * en lugar de "portadas/...", "audios/...", etc.
     *
     * Esto ocurre cuando un Accessor anterior convertía incorrectamente la ruta
     * y se guardaba de nuevo en BD, causando duplicación en futuras conversiones.
     */
    public function up(): void
    {
        // Tabla: canciones - campos: portada, ubicacion
        DB::table('canciones')
            ->where('portada', 'LIKE', 'storage/%')
            ->update(['portada' => DB::raw("SUBSTRING(portada, 9)")]);

        DB::table('canciones')
            ->where('ubicacion', 'LIKE', 'storage/%')
            ->update(['ubicacion' => DB::raw("SUBSTRING(ubicacion, 9)")]);

        // Tabla: colecciones - campo: portada
        DB::table('colecciones')
            ->where('portada', 'LIKE', 'storage/%')
            ->update(['portada' => DB::raw("SUBSTRING(portada, 9)")]);

        // Tabla: playlists - campo: portada
        DB::table('playlists')
            ->where('portada', 'LIKE', 'storage/%')
            ->update(['portada' => DB::raw("SUBSTRING(portada, 9)")]);

        // Tabla: usuarios - campos: avatar, banner
        DB::table('usuarios')
            ->where('avatar', 'LIKE', 'storage/%')
            ->update(['avatar' => DB::raw("SUBSTRING(avatar, 9)")]);

        DB::table('usuarios')
            ->where('banner', 'LIKE', 'storage/%')
            ->update(['banner' => DB::raw("SUBSTRING(banner, 9)")]);

        // Tabla: galeria_usuario - campo: imagen
        DB::table('galeria_usuario')
            ->where('imagen', 'LIKE', 'storage/%')
            ->update(['imagen' => DB::raw("SUBSTRING(imagen, 9)")]);

        // Tabla: eventos - campo: imagen
        DB::table('eventos')
            ->where('imagen', 'LIKE', 'storage/%')
            ->update(['imagen' => DB::raw("SUBSTRING(imagen, 9)")]);

        // Tabla: hardware - campo: imagen
        DB::table('hardware')
            ->where('imagen', 'LIKE', 'storage/%')
            ->update(['imagen' => DB::raw("SUBSTRING(imagen, 9)")]);

        // Tabla: software - campo: imagen
        DB::table('software')
            ->where('imagen', 'LIKE', 'storage/%')
            ->update(['imagen' => DB::raw("SUBSTRING(imagen, 9)")]);
    }

    /**
     * Revertir la migración.
     *
     * Nota: La reversión no puede restaurar los datos originales,
     * así que simplemente evitamos hacer cambios en el rollback.
     */
    public function down(): void
    {
        // No revertir: los datos están corruptos, no hay forma de
        // conocer el valor original de antes de la corrupción
    }
};
