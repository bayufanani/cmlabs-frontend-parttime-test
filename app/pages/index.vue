<template>
  <h1>List ingredients</h1>
  <div v-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else class="ingredient-container">
    <div v-for="ingredient in ingredients?.meals" :key="ingredient.idIngredient" class="ingredient-item"
      @click="clickDetail(ingredient.strIngredient)">
      <img :src="ingredient.strThumb" :alt="ingredient.strIngredient" loading="lazy">
      {{ ingredient.strIngredient }}
    </div>
  </div>
  <NuxtLink to="/detail-ingredients">
    Go to detail ingredients
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ListIngredientsResponse } from '~/domains/ingredients'

const ingredients = ref<ListIngredientsResponse>({ meals: [] })
const pending = ref(true)

onMounted(async () => {
  const { data: res, pending: loading } = await useFetch<ListIngredientsResponse>("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
  ingredients.value = res.value || { meals: [] }
  pending.value = loading.value
})

function clickDetail(ingredient: string) {
  navigateTo(`/detail-ingredient/${ingredient}`)
}
</script>