<template>
  <h1>List ingredients</h1>
  <div class="ingredient-container">
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

onMounted(async () => {
  const { data: res } = await useFetch<ListIngredientsResponse>("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
  ingredients.value = res.value || { meals: [] }
})

function clickDetail(ingredient: string) {
  navigateTo(`/detail-ingredient/${ingredient}`)
}
</script>