<template>
    <div v-if="recipe.meals.length > 0">
        <h1>Detail meals</h1>
        <p>{{ recipe.meals[0].strInstructions }}</p>
        <NuxtLink to="/">
            Back to home
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const meal_id = route.params.meal_id
const recipe = ref({ meals: [] })

onMounted(async () => {
    const { data: res } = await useFetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal_id)
    recipe.value = res.value || {}
    console.log(recipe.value)
})
</script>