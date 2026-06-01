# Unidad 4 - Paso a paso de entrega

## Lo que se corrigio en el repositorio

1. Revise la consigna del PDF `TareaUnidad4-web.pdf`.
2. Identifique que la tarea pide desplegar el proyecto de Unidad 3 en MongoDB Atlas, Railway, Netlify y GitHub Pages.
3. Ajuste el backend para usar `MONGODB_URI` con MongoDB Atlas mediante Mongoose.
4. Mantengo fallback a JSON local para que puedas seguir probando sin base de datos.
5. Complete el CRUD de productos con `GET`, `POST`, `PUT` y `DELETE`.
6. Corregi autenticacion para usar `POST /auth/register` y `POST /auth/login`.
7. Agregue hash de password con `bcryptjs` y token con `jsonwebtoken`.
8. Corregi CORS para aceptar dominios configurados por variable de entorno.
9. Cambie el frontend para usar `VITE_API_URL`, necesario para Netlify.
10. Corregi llamadas hardcodeadas a `http://localhost:3000`.
11. Corregi el detalle de producto, que importaba mal el cliente API.
12. Agregue formularios de admin con categoria e imagen.
13. Limpie textos con caracteres rotos.
14. Agregue configuracion de Netlify y redirects para Vue Router.
15. Cree este documento y un micrositio base en `docs/`.

## Lo que debes hacer tu

### 1. Subir cambios a GitHub

```bash
git status
git add .
git commit -m "Preparar MercApp para despliegue Unidad 4"
git push
```

### 2. Crear MongoDB Atlas

1. Entra a MongoDB Atlas.
2. Crea un proyecto llamado `MercApp`.
3. Crea un cluster gratuito M0.
4. Crea un usuario de base de datos.
5. En Network Access agrega tu IP o `0.0.0.0/0` para pruebas academicas.
6. Copia la cadena de conexion.
7. Cambia usuario, password y nombre de base de datos en la URI.

### 3. Desplegar backend en Railway

1. Crea un proyecto en Railway desde tu repositorio de GitHub.
2. Selecciona como carpeta raiz `backend`.
3. Configura estas variables:

```env
MONGODB_URI=tu_uri_de_mongodb_atlas
PORT=3000
JWT_SECRET=un_texto_largo_y_privado
CORS_ORIGIN=https://tu-sitio.netlify.app
```

4. Despliega.
5. Abre la URL publica de Railway y verifica que responda:

```text
GET /
GET /productos
GET /categorias
```

### 4. Desplegar frontend en Netlify

1. Crea un sitio en Netlify desde GitHub.
2. Selecciona como base directory `frontend`.
3. Build command:

```bash
npm run build
```

4. Publish directory:

```text
dist
```

5. Configura la variable:

```env
VITE_API_URL=https://tu-backend.up.railway.app
```

6. Despliega y prueba catalogo, filtros, carrito y admin.

### 5. Publicar micrositio en GitHub Pages

1. En GitHub entra a Settings > Pages.
2. En Source selecciona Deploy from a branch.
3. Selecciona rama `main` y carpeta `/docs`.
4. Guarda.
5. Copia el enlace de GitHub Pages cuando se publique.

### 6. Completar evidencias

En `docs/index.html` reemplaza los textos `PENDIENTE` con:

- URL del backend en Railway.
- URL del frontend en Netlify.
- URL del repositorio GitHub.
- Capturas o enlaces de evidencia si tu docente los pide.

### 7. Checklist final

- La API abre en Railway.
- `GET /productos` devuelve datos.
- El frontend de Netlify carga productos desde Railway.
- CORS no bloquea la app.
- MongoDB Atlas recibe datos al crear productos.
- README contiene endpoints y variables.
- GitHub Pages muestra el micrositio.
