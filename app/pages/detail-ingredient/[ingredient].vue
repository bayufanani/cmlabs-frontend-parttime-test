<template>
  <h1>Detail ingredients for {{ ingredient }}</h1>
  <div class="meal-container">
    <div v-for="meal in meals?.meals" :key="meal.idMeal" class="meal-item" @click="clickDetail(meal.idMeal)">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" loading="lazy">
      {{ meal.strMeal }}
    </div>
  </div>
  <NuxtLink to="/detail-meals">
    Go to detail meals
  </NuxtLink>
  <NuxtLink to="/">
    Back to home
  </NuxtLink>
</template>

<script setup lang="ts">
const route = useRoute()
const ingredient = route.params.ingredient
const meals = ref([])

onMounted(async () => {
  const { data: res } = await useFetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient)
  meals.value = res.value || []
})

function clickDetail(meal_id: string) {
  navigateTo(`/detail-meal/${meal_id}`)
}
</script>