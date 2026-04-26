<template>
    <div v-if="pending">
        <p>Loading...</p>
    </div>
    <div v-else-if="recipe">
        <img :src="recipe.strMealThumb" :alt="recipe.strMeal" loading="lazy">
        <h1>{{ recipe.strMeal }}</h1>
        <h2>Category {{ recipe.strCategory }}</h2>
        <ul>
            <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
        <p>{{ recipe.strInstructions }}</p>
        <iframe width="560" height="315" :src="recipe.strYoutube.replace('watch?v=', 'embed/')"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <NuxtLink to="/">
            Back to home
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/domains/api-response'
import type { Recipe } from '~/domains/recipe'

const route = useRoute()
const meal_id = route.params.meal_id
const recipe = ref<Recipe | null>()
const pending = ref(true)
const ingredients = computed(() => {
    let ingredientList: string[] = []
    if (recipe.value == null || recipe.value == undefined) {
        return []
    }
    for (let i = 1; i <= 20; i++) {
        ingredientList.push(recipe.value["strIngredient" + i as keyof typeof recipe.value] + " " + recipe.value["strMeasure" + i as keyof typeof recipe.value])
    }
    return ingredientList;
});

onMounted(async () => {
    const { data: res, pending: loading } = await useFetch<ApiResponse<Recipe>>("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal_id)
    recipe.value = res.value?.meals[0]
    pending.value = loading.value
    console.log(recipe.value)
})
</script>