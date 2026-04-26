<template>
    <div class="search">
        <input type="text" class="search-input" placeholder="Filter ..." v-model="model">
    </div>
</template>

<script setup lang="ts">
const model = defineModel({ type: String, default: "" })
</script>