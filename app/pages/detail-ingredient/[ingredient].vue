<template>
  <div class="container">
    <div v-if="pending">
      <p>Loading...</p>
    </div>
    <div v-else-if="filteredMeals.length > 0">
      <h1 class="text-2xl text-green-900 font-bold mb-4">List Recipes for {{ ingredient }}</h1>
      <div class="flex flex-wrap gap-4">
        <div v-for="meal in filteredMeals" :key="meal.idMeal" class="meal-item" @click.stop="clickDetail(meal.idMeal)">
          <img :src="meal.strMealThumb" :alt="meal.strMeal" loading="lazy">
          {{ meal.strMeal }}
          <img :src="meal.isFavourite ? Loved : Love" alt="" class="size-4 absolute right-0 top-0"
            @click.stop="loveThis(meal.idMeal)">
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center font-bold text-2xl text-green-900">Meal not found</p>
    </div>
  </div>
  <Teleport to="#search">
    <Filter v-model="search" />
  </Teleport>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/domains/api-response'
import type { Meal } from '~/domains/meals'
import Love from '~/assets/heart.svg'
import Loved from '~/assets/heart-fill.svg'

const route = useRoute()
const ingredient = route.params.ingredient
const meals = ref<ApiResponse<Meal>>({ meals: [] })
const pending = ref(true)
const search = ref("")
const localFavorite = localStorage.getItem("favourite")
const favourite: string[] = localFavorite != null ? JSON.parse(localFavorite) : []
const filteredMeals = computed(() => {
  return meals.value.meals.filter((meal) => {
    meal.isFavourite = favourite.includes(meal.idMeal)
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

function loveThis(id: string) {
  if (favourite.includes(id)) {
    favourite.splice(favourite.indexOf(id), 1)
  } else {
    favourite.push(id)
  }
  localStorage.setItem("favourite", JSON.stringify(favourite))
  filteredMeals.value.find((meal) => meal.idMeal == id).isFavourite = true
}
</script>