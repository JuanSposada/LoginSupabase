# 🚀 Vue 3 + Supabase Authentication System

Este proyecto es una implementación profesional de un sistema de autenticación (Login) utilizando **Vue 3 (Composition API)** y **Supabase** como Backend-as-a-Service (BaaS).

## 🛠️ Tecnologías Principales

* **Framework:** Vue 3 (Vite)
* **Estado:** Composition API + Custom Composables (`useAuth`)
* **Base de Datos y Auth:** Supabase (PostgreSQL + GoTrue)
* **Cliente HTTP:** SDK oficial `@supabase/supabase-js`

---

## 🏗️ Arquitectura de Funcionamiento

### 1. Conexión con el Backend
La conexión se centraliza en `src/supabaseClient.js`. El cliente utiliza las variables de entorno para inicializar la comunicación segura con el proyecto en la nube:

* **URL del Proyecto:** Punto de enlace API.
* **Anon Key:** Llave pública para interactuar con el esquema de autenticación.

### 2. El Flujo del Login (Paso a Paso)
El sistema no busca usuarios manualmente en una tabla común, sino que utiliza el motor de identidad de Supabase:

1.  **Captura de Datos:** El usuario ingresa `email` y `password` en el formulario.
2.  **Validación Frontend:** Se verifican formatos de correo y longitud de caracteres antes de disparar la red.
3.  **Petición Asíncrona:** Se llama a la función `signInWithPassword`.
4.  **Validación de Credenciales:** Supabase compara el hash de la contraseña en su esquema protegido (`auth.users`).
5.  **Generación de Sesión:** Si los datos son válidos, el servidor devuelve un objeto de sesión que contiene el **User Data** y el **JWT**.

### 3. Gestión de JWT (JSON Web Tokens)
Este proyecto elimina la necesidad de gestionar tokens manualmente en bases de datos locales:

* **Persistencia:** Al recibir el JWT, el SDK de Supabase lo almacena automáticamente en el `LocalStorage` del navegador bajo una clave encriptada.
* **Validación Stateless:** Cada vez que el usuario intenta acceder a un dato, el token se envía en las cabeceras (headers) de forma automática.
* **Ciclo de Vida:** El sistema incluye una función `checkUserSession` que valida la vigencia del token al refrescar la página, manteniendo al usuario conectado sin re-autenticación.

---

## 📂 Estructura del Código de Autenticación

* **`src/supabaseClient.js`**: Instancia global del cliente Supabase.
* **`src/composables/useAuth.js`**: Composable que encapsula el estado global del usuario (`_user`) y los métodos `login`, `logout` y `checkSession`.
* **`src/views/LoginView.vue`**: Vista de login que gestiona el feedback visual (errores, estados de carga y validaciones).

---

## ⚙️ Configuración del Entorno

Para replicar este proyecto, asegúrate de tener las siguientes variables en tu archivo `.env`:

```env
VITE_SUPABASE_URL=[https://tu-proyecto.supabase.co](https://tu-proyecto.supabase.co)
VITE_SUPABASE_PUBLISHABLE_KEY=tu-llave-anonima-aqui
```

## ⚙️ Configuración en el Dashboard de Supabase

Para que el sistema de autenticación funcione correctamente, asegúrate de realizar estos pasos en tu panel de Supabase:

1.  **Activar el proveedor:** Ve a `Authentication` > `Providers` y habilita **Email**.
2.  **Confirmación de correo:** (Opcional) En `Authentication` > `Email Templates`, puedes desactivar **Confirm Email** para entornos de desarrollo; esto permitirá que los usuarios logueen inmediatamente tras el registro.
3.  **Gestión de Usuarios:** Puedes crear usuarios de prueba manualmente desde la sección `Authentication` > `Users` haciendo clic en "Add User".

---

## 🚀 Ejecución del Proyecto

Sigue estos comandos en tu terminal para poner en marcha la aplicación:

```bash
# Instalar las dependencias del proyecto
npm install

# Ejecutar el servidor de desarrollo (Vite)
npm run dev

# Construir la aplicación para producción
npm run build
```
## 🔐 Consejo de Seguridad

**Nota de Seguridad:** Las contraseñas nunca se almacenan en texto plano en la base de datos ni son accesibles desde el código frontend (Vue). Todo el proceso de encriptación y validación ocurre de forma segura en el lado del servidor de Supabase utilizando algoritmos de hash robustos.

## 🌐 Despliegue (Live Demo)

Puedes ver la aplicación funcionando en tiempo real en el siguiente enlace:

* **[Ver Proyecto en Vercel](https://login-supabase-plum.vercel.app/)**
