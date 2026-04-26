<template>
  <h1>Detail ingredients for {{ ingredient }}</h1>
  <div v-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else class="meal-container">
    <div v-for="meal in filteredMeals" :key="meal.idMeal" class="meal-item" @click="clickDetail(meal.idMeal)">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" loading="lazy">
      {{ meal.strMeal }}
    </div>
  </div>
  <Teleport to="#search">
    <div class="search">
      <input type="text" class="search-input" placeholder="Filter meals..." v-model="search">
    </div>
  </Teleport>
  <NuxtLink to="/detail-meals">
    Go to detail meals
  </NuxtLink>
  <NuxtLink to="/">
    Back to home
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/domains/api-response'
import type { Meal } from '~/domains/meals'

const route = useRoute()
const ingredient = route.params.ingredient
const meals = ref<ApiResponse<Meal>>({ meals: [] })
const pending = ref(true)
const search = ref("")
const filteredMeals = computed(() => {
  return meals.value.meals.filter((meal) => {
    return meal.strMeal.toLowerCase().includes(search.value.toLowerCase())
  })
})

onMounted(async () => {
  const { data: res, pending: loading } = await useFetch<ApiResponse<Meal>>("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient)
  meals.value = res.value || { meals: [] }
  pending.value = loading.value
})

function clickDetail(meal_id: string) {
  navigateTo(`/detail-meal/${meal_id}`)
}
</script>