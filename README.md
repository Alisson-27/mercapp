# 🛒 MercApp - Catálogo de Productos SPA

---

## 📌 Información del Proyecto

**Estudiante:**  
Alisson Alejandra Herrera Garzón  

**Universidad:**  
Universidad Politécnica Salesiana  

**Carrera:**  
Ingeniería de Software  

**Asignatura:**  
Aplicaciones Web - Tarea Unidad 4  

---

## 📖 Descripción

MercApp es una aplicación web tipo **tienda en línea (SPA - Single Page Application)** desarrollada con Vue 3 en el frontend y Node.js con Express en el backend.

Permite gestionar y visualizar productos, filtrarlos por categorías, realizar búsquedas y simular un carrito de compras con persistencia local.

---
## Tecnologias

- Vue 3 + Vue Router + Pinia
- Node.js + Express
- MongoDB Atlas con Mongoose
- Axios
- Railway para backend
- Netlify para frontend
- GitHub Pages para micrositio

## Estructura


## Estructura del proyecto

```txt
mercapp/
├── backend/        API REST, modelos Mongoose y rutas
├── frontend/       SPA desarrollada con Vue 3
├── docs/           Micrositio para GitHub Pages
├── README.md
├── readme.txt
├── package.json
└── .gitignore

## 🚀 Funcionalidades

- ✔ Listado de productos desde API
- ✔ Búsqueda de productos en tiempo real
- ✔ Filtro por categorías
- ✔ Carrito de compras funcional
- ✔ Persistencia del carrito en localStorage
- ✔ Registro y login de usuarios
- ✔ API REST propia

## Ejecucion local

1. Instalar dependencias:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

2. Crear variables de entorno:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Ejecutar backend:

```bash
npm --prefix backend run dev
```

4. Ejecutar frontend en otra terminal:

```bash
npm --prefix frontend run dev
```

Si `MONGODB_URI` no esta configurada, el backend usa `backend/products.json` y `backend/user.json` para desarrollo local.

## Endpoints

- `GET /` estado de la API
- `GET /productos` listar productos
- `GET /productos/:id` obtener producto
- `POST /productos` crear producto
- `PUT /productos/:id` actualizar producto
- `DELETE /productos/:id` eliminar producto
- `GET /categorias` listar categorias
- `POST /auth/register` registrar usuario
- `POST /auth/login` iniciar sesion

## Variables de entorno

Backend:

```env
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:PASSWORD@CLUSTER.mongodb.net/mercapp?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:5173,https://TU-SITIO.netlify.app
JWT_SECRET=cambia-este-secreto
```

Frontend:

```env
VITE_API_URL=http://localhost:3000
```

