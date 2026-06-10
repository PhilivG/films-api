# 🎬 Proyecto API REST — Películas y Directores

## Descripción General

API RESTful construida con **Node.js**, **Express** y **Mongoose**, conectada a una base de datos en **MongoDB Atlas**. Permite gestionar dos recursos principales: **películas** y **directores**, con soporte para operaciones CRUD completas con paginación.

**Funcionalidades principales:**
- Listar, crear, actualizar y eliminar películas
- Listar, crear, actualizar y eliminar directores
- Paginación mediante parámetros `?page=` y `?limit=`
- Validaciones de datos en los esquemas de Mongoose
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

Crea un archivo `.env` en la raíz del proyecto basándote en el ejemplo de la sección anterior. Reemplaza los valores con tus credenciales de MongoDB Atlas.

> ⚠️ Asegúrate de que tu IP esté autorizada en el **Network Access** de MongoDB Atlas, o usa `0.0.0.0/0` para pruebas.

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

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Estado de la API |
| `GET` | `/movies` | Listar películas (soporta `?page=` y `?limit=`) |
| `GET` | `/movies/:id` | Obtener una película por ID |
| `POST` | `/movies` | Crear una nueva película |
| `PUT` | `/movies/:id` | Actualizar una película |
| `DELETE` | `/movies/:id` | Eliminar una película |
| `GET` | `/directors` | Listar directores |
| `GET` | `/directors/:id` | Obtener un director por ID |
| `POST` | `/directors` | Crear un nuevo director |
| `PUT` | `/directors/:id` | Actualizar un director |
| `DELETE` | `/directors/:id` | Eliminar un director |

---

## Datos de Prueba

El repositorio incluye dos archivos JSON con datos listos para poblar la base de datos:

| Archivo | Contenido |
|---------|-----------|
| `movies.json` | 15 películas con título, año, director, duración, género, poster y rating |
| `directors.json` | 13 directores con nombre, nacionalidad y año de nacimiento |

Puedes importarlos directamente a tu colección de MongoDB Atlas usando **MongoDB Compass** o el comando `mongoimport`:

```bash
mongoimport --uri "tu-mongodb-uri" --collection movies --file movies.json --jsonArray
mongoimport --uri "tu-mongodb-uri" --collection directors --file directors.json --jsonArray
```

---

## Estado del Proyecto

🟡 **En desarrollo** — Módulo 2 del BIT Full Stack Bootcamp.

Funcionalidades implementadas hasta la fecha:
- [x] Conexión a MongoDB Atlas
- [x] Modelos con validaciones (Movies, Directors)
- [x] CRUD completo para ambos recursos
- [x] Paginación con `.skip()` y `.limit()`
- [x] Manejo de errores con `try/catch`
- [ ] Autenticación con JWT *(pendiente)*
- [ ] Pruebas automatizadas *(pendiente)*

---

## Información de Contacto

- **GitHub:** [github.com/PhilivG](https://github.com/PhilivG)
