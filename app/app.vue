<script setup lang="ts">
function goToHome() {
  navigateTo("/")
}
</script>
<template>
  <header>
    <div class="brand">
      <h1 class="text-2xl font-bold hover:cursor-pointer" @click="goToHome()">Kulineranku</h1>
    </div>
    <div id="search">

    </div>
    <div class="menu">
      <div class="menu-item">
        <NuxtLink to="/">Resep Favorit</NuxtLink>
      </div>
    </div>
  </header>
  <NuxtPage />
</template>
