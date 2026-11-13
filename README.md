# In Fox Gym · API

API del sitio de **In Fox Gym**, un gimnasio. Maneja los horarios de las clases que se muestran en la web y que se editan desde el panel de administración.

El frontend está en [infoxgym-front](https://github.com/Mileniumm/infoxgym-front).

## Tecnologías

- [NestJS](https://nestjs.com/) 11 con TypeScript
- [Supabase](https://supabase.com/) (PostgreSQL) a través de `@supabase/supabase-js`
- `@nestjs/config` para las variables de entorno

## Endpoints

| Método | Ruta | Qué hace |
| --- | --- | --- |
| `GET` | `/schedule` | Devuelve los días de la semana, cada uno con sus clases (horario, actividad y profe) |
| `POST` | `/schedule/:day_id` | Agrega una clase al día indicado |
| `PUT` | `/schedule/:id` | Modifica una clase |
| `DELETE` | `/schedule/:id` | Elimina una clase |

## Estructura

```
src/
├── main.ts                 arranque, CORS y puerto
├── app.module.ts
├── schedule/               módulo de horarios: controller, service, DTOs y entidades
└── supabase/               servicio que crea el cliente de Supabase con las variables de entorno
```

La lógica sigue la separación de NestJS: el controller recibe el pedido, el service consulta Supabase y el módulo `supabase` se inyecta donde se necesita.

## Cómo correrlo

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raíz (podés copiar `.env.example`) con los datos del proyecto de Supabase:

   ```
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=tu-clave
   PORT=3001
   ```

   El `.env` está en el `.gitignore`: las claves no se suben al repositorio.

3. Levantar la API en modo desarrollo:

   ```bash
   npm run start:dev
   ```

   Queda escuchando en `http://localhost:3001`.

## Base de datos

Usa dos tablas de Supabase:

- `days`: los días de la semana (`id`, `name`).
- `schedules`: las clases de cada día (`id`, `day_id`, `start_time`, `end_time`, `activity`, `trainer`).
