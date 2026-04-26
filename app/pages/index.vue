<template>
  <h1>List ingredients</h1>
  <div v-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else class="ingredient-container">
    <div v-for="ingredient in filteredIngredients" :key="ingredient.idIngredient" class="ingredient-item"
      @click="clickDetail(ingredient.strIngredient)">
      <img :src="ingredient.strThumb" :alt="ingredient.strIngredient" loading="lazy">
      {{ ingredient.strIngredient }}
    </div>
  </div>
  <NuxtLink to="/detail-ingredients">
    Go to detail ingredients
  </NuxtLink>

  <Teleport to="#search">
    <div class="search">
      <input type="text" class="search-input" placeholder="Filter ingredients..." v-model="search">
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/domains/api-response'
import type { Ingredient } from '~/domains/ingredients'

const ingredients = ref<ApiResponse<Ingredient>>({ meals: [] })
const pending = ref(true)
const search = ref("")
const filteredIngredients = computed(() => {
  return ingredients.value.meals.filter((ingredient) => {
    return ingredient.strIngredient.toLowerCase().includes(search.value.toLowerCase())
  })
})

onMounted(async () => {
  const { data: res, pending: loading } = await useFetch<ApiResponse<Ingredient>>("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
  ingredients.value = res.value || { meals: [] }
  pending.value = loading.value
})

function clickDetail(ingredient: string) {
  navigateTo(`/detail-ingredient/${ingredient}`)
}
</script>