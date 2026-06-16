# 🎬 Proyecto API REST — Películas y Directores

## Descripción General

API RESTful construida con **Node.js**, **Express** y **Mongoose**, conectada a una base de datos en **MongoDB Atlas**. Permite gestionar dos recursos principales: **películas** y **directores**, con soporte para operaciones CRUD completas con paginación.

**Funcionalidades principales:**
- Listar, crear, actualizar y eliminar películas
- Listar, crear, actualizar y eliminar directores
- Paginación mediante parámetros `?page=` y `?limit=`
- Validaciones de datos en los esquemas de Mongoose
- Autenticación de usuarios con **JWT** (registro, login y protección de rutas)
- Conexión segura a MongoDB Atlas mediante variables de entorno

---

## Autores

| Nombre | Rol |
|--------|-----|
| Juan Felipe Valencia Granada (Philip) | Desarrollo backend — arquitectura, modelos, controladores y rutas |

---

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

| Herramienta | Versión recomendada |
|-------------|---------------------|
| [Node.js](https://nodejs.org/) | v18 o superior |
| Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | — |

> El proyecto usa **pnpm** como gestor de paquetes, pero también es compatible con **npm**. Elige la opción que prefieras en el paso de instalación.

---

## Instrucciones de Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/PhilivG/proyecto-api.git
cd proyecto-api
```

### 2. Instalar dependencias

**Opción A — con pnpm** *(recomendado)*:
```bash
# Si no tienes pnpm instalado:
npm install -g pnpm

# Instalar dependencias:
pnpm install
```

**Opción B — con npm** *(sin instalar nada extra)*:
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido, reemplazando los valores con tus propias credenciales:

```env
MONGODB_URI=tu-uri-de-mongodb-atlas
PORT=3000

JWT_SECRET=una-clave-secreta-larga-y-dificil-de-adivinar
JWT_EXPIRES_IN=7d
```

| Variable | Descripción |
|----------|-------------|
| `MONGODB_URI` | Cadena de conexión a tu cluster de MongoDB Atlas |
| `PORT` | Puerto donde correrá el servidor (por defecto `3000`) |
| `JWT_SECRET` | Clave usada para firmar y verificar los tokens JWT |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token (ej. `7d`, `24h`, `1h`) |

> ⚠️ Asegúrate de que tu IP esté autorizada en el **Network Access** de MongoDB Atlas, o usa `0.0.0.0/0` para pruebas.
>
> ⚠️ `JWT_SECRET` nunca debe subirse al repositorio. El `.env` ya está incluido en `.gitignore`; usa una clave distinta y robusta en producción.

### 4. Levantar el servidor en modo desarrollo

Con pnpm:
```bash
pnpm run dev:1
```

Con npm:
```bash
npm run dev:1
```

El servidor estará disponible en `http://localhost:1234` (o el puerto definido en `.env`).

### Endpoints disponibles

| Método | Ruta | Descripción | Protegida |
|--------|------|-------------|-----------|
| `GET` | `/` | Estado de la API | No |
| `POST` | `/auth/register` | Registrar un nuevo usuario | No |
| `POST` | `/auth/login` | Iniciar sesión y obtener un token JWT | No |
| `GET` | `/movies` | Listar películas (soporta `?page=` y `?limit=`) | No |
| `GET` | `/movies/:id` | Obtener una película por ID | No |
| `POST` | `/movies` | Crear una nueva película | 🔒 Sí |
| `PUT` | `/movies/:id` | Actualizar una película | 🔒 Sí |
| `DELETE` | `/movies/:id` | Eliminar una película | 🔒 Sí |
| `GET` | `/directors` | Listar directores | No |
| `GET` | `/directors/:id` | Obtener un director por ID | No |
| `POST` | `/directors` | Crear un nuevo director | 🔒 Sí |
| `PUT` | `/directors/:id` | Actualizar un director | 🔒 Sí |
| `DELETE` | `/directors/:id` | Eliminar un director | 🔒 Sí |

---

## Autenticación (JWT)

Las rutas marcadas como **protegidas** requieren un token JWT válido enviado en el header `Authorization`.

### 1. Registro

```http
POST /auth/register
Content-Type: application/json

{
  "username": "philipvg",
  "password": "1234567"
}
```

La contraseña se guarda cifrada con **bcryptjs** (nunca en texto plano). La respuesta incluye el token generado para ese usuario.

### 2. Login

```http
POST /auth/login
Content-Type: application/json

{
  "username": "philipvg",
  "password": "1234567"
}
```

Si las credenciales son correctas, la API responde con un token JWT:

```json
{
  "exitoso": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Usar el token en rutas protegidas

Envía el token en el header `Authorization` con el prefijo `Bearer`:

```http
POST /movies
Content-Type: application/json
Authorization: Bearer <tu-token-aquí>

{
  "title": "Inception",
  "year": 2010,
  "duration": 148,
  "genre": ["Action", "Sci-Fi"],
  "rate": 8.8
}
```

Si el token falta, es inválido o expiró, la API responde `401 Unauthorized`.

### ¿Cómo funciona internamente?

- **`modules/User.js`**: modelo de usuario con `username` y `password`; un hook `pre('save')` cifra la contraseña con bcrypt antes de guardarla, y un método `comparePassword` la compara en el login.
- **`controllers/authController.js`**: expone `register` y `login`, y genera el token con `jwt.sign()` usando `JWT_SECRET` y `JWT_EXPIRES_IN`.
- **`middlewares/auth.js`**: middleware `protect` que verifica el token con `jwt.verify()`, recupera el usuario y lo agrega a `req.user` antes de continuar al controlador.
- **`router/movieRoutes.js` y `router/directorRoutes.js`**: aplican `protect` únicamente a `POST`, `PUT` y `DELETE`; las rutas `GET` permanecen públicas.

---

## Datos de Prueba

El repositorio incluye dos archivos JSON con datos listos para poblar la base de datos:

| Archivo | Contenido |
|---------|-----------|
| `movies.json` | 15 películas con título, año, director, duración, género, poster y rating |
| `directors.json` | 13 directores con nombre, nacionalidad y año de nacimiento |

---

## Estado del Proyecto

🟡 **En desarrollo** — Módulo 2 del BIT Full Stack Bootcamp.

Funcionalidades implementadas hasta la fecha:
- [x] Conexión a MongoDB Atlas
- [x] Modelos con validaciones (Movies, Directors, User)
- [x] CRUD completo para ambos recursos
- [x] Paginación con `.skip()` y `.limit()`
- [x] Manejo de errores con `try/catch`
- [x] Autenticación con JWT (registro, login y rutas protegidas)
- [ ] Pruebas automatizadas *(pendiente)*

---

## Información de Contacto

- **GitHub:** [github.com/PhilivG](https://github.com/PhilivG)

---

<details>
<summary>🌸 Easter egg</summary>

```
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀ ⣀⣤⣴⠶⠿⠛⠛⠛⠛⠿⠷⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣠⡾⠟⠛⠛⠛⠿⣦⣄⠀⣠⣴⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣼⡟⠀⠀⠀⠀⠀⠀⠈⢙⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢰⣿⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡎⠉⢱⡀⠀⠀⠀⠀⡜⠁⠹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠹⣷⡀⠀⠀⠀⠀⠀⠀
⠈⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⢸⡇⠀⠀⠀⢰⡇⠀⢠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣷⡀⠀⠀⠀⠀⠀
⠀⢹⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣶⣿⡇⠀⠀⠀⢸⣿⣶⣾⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣧⠀⠀⠀⠀⠀
⠀⠀⢻⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡇⠀⠀⠀⠸⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣆⠀⠀⠀⠀
⠀⠀⠀⠹⣷⡴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⠁⠀⠀⠀⠀⢿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠈⠻⣷⡀⠀⠀
⠀⠀⠀⠀⢸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠁⢠⣶⣶⣶⣦⠈⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠘⣷⡀⠀
⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣏⠀⢈⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⢹⣇⠀
⠀⠀⠀⠀⠘⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⢸⣿⠀
⠀⠀⠀⠀⠀⢹⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⣸⡟⠀
⠀⠀⠀⠀⠀⠀⢿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠀⠀⠀⣀⣴⡿⠁⠀
⠀⠀⠀⠀⠀⠀⣸⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣨⣿⣿⡛⠛⠉⠀⠀⠀
⠀⠀⠀⢀⣴⣿⠋⠁⠙⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠏⠈⠙⠻⣶⣄⠀⠀⠀
⠀⢀⣴⣿⣯⣴⡆⠀⠀⠀⠙⢦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠁⠀⠀⢰⣶⣬⣻⣷⡀⠀
⠀⣾⠏⢸⣿⠿⠃⠀⠀⠀⠀⠀⠙⠳⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠶⠋⠀⠀⠀⠀⠀⠈⠻⢿⡿⠹⣿⡀
⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠲⢦⣤⣤⣀⣀⠀⢀⣀⣠⣤⣤⠶⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣹⡇
⠀⠻⣷⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣬⣿⠟⠛⠻⣿⣯⣥⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⡿⠃
⠀⠀⠀⠉⠛⠛⠿⠿⠶⠶⠶⠶⠶⠿⠿⠿⠟⠛⠛⠋⠉⠀⠀⠀⠀⠀⠉⠉⠛⠛⠻⠿⠿⠿⠶⠶⠶⠾⠿⠛⠛⠋⠁⠀⠀
```

*Kirby aprobando el JWT.* ¡Poyo!

</details>