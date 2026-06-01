# MercApp - Proyecto Unidad 3 listo para Unidad 4

MercApp es una SPA de catalogo y carrito desarrollada con Vue 3 en el frontend y Node.js + Express en el backend. Para la Unidad 4 queda preparada para desplegarse con MongoDB Atlas, Railway, Netlify y GitHub Pages.

## Tecnologias

- Vue 3 + Vue Router + Pinia
- Node.js + Express
- MongoDB Atlas con Mongoose
- Axios
- Railway para backend
- Netlify para frontend
- GitHub Pages para micrositio

## Estructura

```text
backend/   API REST, modelos Mongoose y fallback JSON local
frontend/  SPA Vue 3
docs/      micrositio para GitHub Pages y guia de entrega
```

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

En Netlify, `VITE_API_URL` debe apuntar a la URL publica de Railway.

## Despliegue Unidad 4

El paso a paso completo esta en [docs/UNIDAD4_PASO_A_PASO.md](docs/UNIDAD4_PASO_A_PASO.md).

Cuando publiques:

- Backend Railway: pega aqui la URL final.
- Frontend Netlify: pega aqui la URL final.
- Micrositio GitHub Pages: pega aqui la URL final.
