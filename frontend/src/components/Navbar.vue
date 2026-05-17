<template>
  <nav class="nav">
    <router-link to="/">🏠 Home</router-link>
    <router-link to="/cart">🛒 Carrito</router-link>
    <router-link to="/about">ℹ️ About</router-link>
  </nav>
</template>

<style>
.nav {
  display: flex;
  gap: 15px;
  padding: 10px;
  background: #222;
}

.nav a {
  color: white;
  text-decoration: none;
}
</style>