<?php

namespace Database\Factories;

use App\Models\Evento;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * EventoFactory - Factory para generar datos de prueba de eventos
 *
 * Genera instancias fake de eventos musicales (conciertos, festivales, etc.)
 * con datos realistas para pruebas, seeders y testing. Cada evento creado tendrá:
 * - URL única de venta de entradas
 * - Nombre/título del evento
 * - Nombre de la sala/venue
 * - Dirección/ubicación
 * - Imagen de cartel/póster
 * - Año/fecha del evento
 *
 * Los eventos generados pueden luego asociarse con:
 * - Usuarios (propietarios y colaboradores)
 * - Géneros/estilos musicales
 *
 * Uso en tests:
 * - Evento::factory()->create() - Crea evento
 * - Evento::factory()->count(5)->create() - Crea 5 eventos
 * - Evento::factory()->create(['nombre' => 'TechFest 2026']) - Sobrescribe campos
 *
 * @extends Factory<Evento>
 */
class EventoFactory extends Factory
{
    /**
     * Define el estado predeterminado del modelo Evento.
     *
     * Genera atributos aleatorios usando Faker para poblar un registro
     * de evento con datos realistas pero ficticios.
     *
     * Atributos generados:
     * - url_venta: URL única para compra de entradas
     * - nombre: nombre del evento (3 palabras)
     * - nombre_sala: nombre de empresa + " Stage" como venue
     * - ubicacion: dirección aleatoria
     * - imagen: URL de imagen fake en categoría "concert" (800x600)
     * - fecha_evento: año aleatorio
     * - latitud: null (opcional, se puede rellenar después)
     * - longitud: null (opcional, se puede rellenar después)
     * - id_usuario: null (opcional, se asigna manualmente si se requiere)
     *
     * @return array<string, mixed> Atributos del evento
     */
    public function definition(): array
    {
        return [
            'url_venta' => 'https://tickets.example.com/' . rand(1, 9999),
            'nombre' => 'Event ' . rand(1, 9999),
            'nombre_sala' => 'Venue ' . rand(1, 9999),
            'ubicacion' => 'Europe',
            'imagen' => 'portadas/portada-default.jpg',
            'fecha_evento' => date('Y-m-d', strtotime('+' . rand(1, 365) . ' days')),
        ];
    }

    /**
     * Crea un evento basado en una venue real europea.
     */
    public function fromVenue($venue): static
    {
        return $this->state(function (array $attributes) use ($venue) {
            return [
                'url_venta' => $venue['url_venta'] ?? 'https://tickets.example.com/' . rand(1, 9999),
                'nombre' => ($venue['nombre'] ?? 'Event') . ' ' . date('Y'),
                'nombre_sala' => $venue['nombre_sala'] ?? 'Venue',
                'ubicacion' => $venue['ubicacion'] ?? 'Europe',
                'latitud' => $venue['latitud'] ?? 50.0,
                'longitud' => $venue['longitud'] ?? 10.0,
                'imagen' => 'portadas/portada-default.jpg',
                'fecha_evento' => date('Y-m-d', strtotime('+' . rand(1, 365) . ' days')),
            ];
        });
    }

    /**
     * Asigna géneros al evento (se sincronizarán en seeder).
     *
     * Almacena IDs de géneros para ser sincronizados después de creación.
     *
     * @param array $genreIds IDs de estilos a asignar
     * @return $this Factory state
     */
    public function withGenres($genreIds): static
    {
        return $this->state(function (array $attributes) use ($genreIds) {
            $attributes['_genre_ids'] = $genreIds;
            return $attributes;
        });
    }
}
