<script setup lang="ts">
import BookmarkIcon from '~/assets/bookmark.svg'
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
  </header>
  <NuxtPage />
</template>
