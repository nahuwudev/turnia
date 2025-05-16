# Turnia - Ejemplo de App de Gestión de Turnos y Clientes

**Turnia** es una aplicación de ejemplo diseñada para gestionar turnos y clientes a través de un dashboard intuitivo. Este proyecto fue creado como un prototipo para explorar la implementación de un sistema de citas usando tecnologías modernas de desarrollo web. No está terminado ni pensado para uso en producción, sino como una base para aprender y experimentar.

## Descripción

El objetivo de Turnia es proporcionar un dashboard donde los profesionales puedan:
- Gestionar citas con clientes.
- Visualizar próximas citas y métricas clave.
- Manejar perfiles de usuarios (clientes y profesionales).

La app incluye autenticación con Supabase, un calendario para citas, y vistas enriquecidas con datos de clientes. Este proyecto es un ejemplo educativo y no está completo, pero puede servir como punto de partida para desarrollar una solución más robusta.

## Tecnologías Utilizadas

- **Frontend**:
  - React
  - Zustand (gestión de estado)
  - React Query (gestión de datos asíncronos)
  - Tailwind CSS y Shadcn (estilos y componentes UI)
- **Build Tool**:
  - Vite
- **Backend**:
  - Supabase (autenticación, base de datos y almacenamiento)

## Estructura del Proyecto

### Base de Datos

La base de datos está diseñada en Supabase y consta de las siguientes tablas y vistas:

#### Tablas
- **`appointments`**: Almacena las citas con campos como `appointment_date`, `status`, `client_id`, `user_id`, `notes`, `tag`, etc.
- **`invoices`**: Registra facturas con campos como `amount`, `hours_billed`, `status`, `issue_date`, etc.
- **`profiles`**: Define roles (`client` o `professional`) y estados de usuarios.

#### Vistas
- **`appointments_details_view`**: Combina datos de `appointments` y `auth.users` para incluir información del cliente como `full_name` y `email`.
- **`user_details_view`**: Une `auth.users` y `profiles` para mostrar detalles del usuario como `full_name`, `role` y `avatar_profile`.

#### Archivo de Tipos
El archivo `database.types.ts` (generado por Supabase) incluye los tipos para las tablas y vistas. **Nota**: Este archivo es un ejemplo parcial y no refleja la implementación completa del proyecto, ya que solo se incluyeron algunas tablas y vistas útiles como referencia.

#### Script de Creación
El script SQL para crear las tablas y vistas está incluido en el proyecto. Puedes ejecutarlo en Supabase para configurar la base de datos:

```sql
-- Drop existing views
DROP VIEW IF EXISTS public.appointments_details_view;
DROP VIEW IF EXISTS public.user_details_view;

-- Create appointments table
CREATE TABLE public.appointments (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  user_id uuid NULL,
  appointment_date timestamp with time zone NOT NULL,
  status character varying(50) NOT NULL DEFAULT 'inactive'::character varying,
  attended boolean NULL,
  created_at timestamp with time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NULL DEFAULT CURRENT_TIMESTAMP,
  client_id uuid NULL,
  type_of_date text NULL,
  recordatory boolean NULL DEFAULT false,
  notes text NULL,
  tag text NULL,
  CONSTRAINT appointments_pkey PRIMARY KEY (id),
  CONSTRAINT appointments_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT appointments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT notes_length_check CHECK ((char_length(notes) <= 5000)),
  CONSTRAINT tag_length_check CHECK ((char_length(tag) <= 100)),
  CONSTRAINT type_of_date_check CHECK ((type_of_date = ANY (ARRAY['video_call'::text, 'telephone'::text, 'in person'::text])))
) TABLESPACE pg_default;

-- Create invoices table
CREATE TABLE public.invoices (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  user_id uuid NULL,
  amount numeric(10,2) NOT NULL,
  hours_billed numeric(10,2) NULL,
  status character varying(50) NOT NULL,
  issue_date timestamp with time zone NOT NULL,
  created_at timestamp with time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT invoices_pkey PRIMARY KEY (id),
  CONSTRAINT invoices_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  role text NULL DEFAULT 'client'::text,
  status public.user_status NULL DEFAULT 'active'::user_status,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT profiles_role_check CHECK ((role = ANY (ARRAY['professional'::text, 'client'::text])))
) TABLESPACE pg_default;

-- Create appointments_details_view
CREATE OR REPLACE VIEW public.appointments_details_view AS
SELECT 
    a.id AS appointment_id,
    a.user_id,
    a.appointment_date,
    a.status,
    a.attended,
    a.created_at,
    a.updated_at,
    a.type_of_date,
    a.recordatory,
    a.notes,
    a.tag,
    u.raw_user_meta_data->>'full_name' AS full_name,
    u.email  
FROM 
    public.appointments a
LEFT JOIN 
    auth.users u ON a.client_id = u.id;

-- Create user_details_view
CREATE OR REPLACE VIEW public.user_details_view AS
SELECT 
    u.id AS user_id,
    u.email,
    u.created_at,
    COALESCE(u.raw_user_meta_data ->> 'full_name'::text, u.raw_user_meta_data ->> 'given_name'::text, 'Unknown'::text) AS full_name,
    p.role,
    COALESCE(u.raw_user_meta_data ->> 'avatar_url'::text, 'default_avatar_url.png'::text) AS avatar_profile
FROM 
    auth.users u
JOIN 
    profiles p ON u.id = p.id;

-- Grant permissions on views
GRANT SELECT ON public.appointments_details_view TO authenticated;
GRANT SELECT ON public.user_details_view TO authenticated;
```

## Instalación

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/turnia.git
   cd turnia
   ```

2. **Instalar Dependencias**:
   Asegúrate de tener Node.js instalado y ejecuta:
   ```bash
   npm install
   ```

3. **Configurar Supabase**:
   - Crea un proyecto en [Supabase](https://supabase.com).
   - Configura las variables de entorno en un archivo `.env`:
     ```
     VITE_SUPABASE_URL=tu-supabase-url
     VITE_SUPABASE_ANON_KEY=tu-supabase-anon-key
     ```
   - Ejecuta el script SQL de creación de tablas y vistas en el SQL Editor de Supabase.

4. **Generar Tipos de Supabase**:
   Usa el CLI de Supabase para generar los tipos:
   ```bash
   npx supabase gen types typescript --project-id tu-project-id > src/lib/database.types.ts
   ```

5. **Ejecutar el Proyecto**:
   Inicia el servidor de desarrollo con Vite:
   ```bash
   npm run dev
   ```

## Uso

- **Dashboard**: Visualiza las próximas citas y métricas de clientes.
- **Calendario**: Gestiona citas con un calendario interactivo.
- **Autenticación**: Usa Supabase para login con Google u otros proveedores.

**Nota**: Este es un proyecto de ejemplo, por lo que algunas funcionalidades (como la gestión completa de clientes o facturación) no están implementadas. Puedes usar este código como base para expandir según tus necesidades.

## Contribuciones

Este proyecto no está pensado para recibir contribuciones, ya que es un ejemplo educativo. Sin embargo, si querés usarlo como base para tu propio proyecto, ¡adelante! Si tenés ideas o mejoras, podés hacer un fork y trabajar en tu propia versión.

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE). Siéntete libre de usarlo, modificarlo y distribuirlo según los términos de la licencia.