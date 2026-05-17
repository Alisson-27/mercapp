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
Aplicaciones Web - Tarea Unidad 3  

---

## 📖 Descripción

MercApp es una aplicación web tipo **tienda en línea (SPA - Single Page Application)** desarrollada con Vue 3 en el frontend y Node.js con Express en el backend.

Permite gestionar y visualizar productos, filtrarlos por categorías, realizar búsquedas y simular un carrito de compras con persistencia local.

---

## 🧠 Arquitectura del Proyecto

### 🔵 Frontend (Vue 3)
- Interfaz de usuario dinámica
- Consumo de API REST
- Manejo de carrito con LocalStorage
- Filtros y búsqueda reactiva
- Vue Router para navegación SPA

### 🟢 Backend (Node.js + Express)
- API REST propia
- Gestión de productos y usuarios
- Persistencia en archivos JSON
- Endpoints para CRUD básico

---

## ⚙️ Tecnologías Utilizadas

- Vue 3 (Composition API)
- Vue Router
- Node.js
- Express.js
- Axios
- JavaScript (ES6+)
- HTML5 + CSS3
- LocalStorage

---

## 🚀 Funcionalidades

- ✔ Listado de productos desde API
- ✔ Búsqueda de productos en tiempo real
- ✔ Filtro por categorías
- ✔ Carrito de compras funcional
- ✔ Persistencia del carrito en localStorage
- ✔ Registro y login de usuarios
- ✔ API REST propia

---

## 📡 Endpoints del API

### Productos
- GET `/productos`
- GET `/productos/:id`
- POST `/productos`
- DELETE `/productos/:id`

### Categorías
- GET `/categorias`

### Autenticación
- POST `/register`
- POST `/login`

---

## ▶️ Cómo ejecutar el proyecto

### 🔵 Backend

```bash id="backend_run"
cd backend
node index.js

Proyecto actualizado y funcional con API REST integrada.