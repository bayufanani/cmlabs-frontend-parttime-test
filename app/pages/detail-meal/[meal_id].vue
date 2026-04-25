<template>
    <div v-if="pending">
        <p>Loading...</p>
    </div>
    <div v-else-if="recipe.meals.length > 0">
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
const pending = ref(true)

onMounted(async () => {
    const { data: res, pending: loading } = await useFetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal_id)
    recipe.value = res.value || {}
    pending.value = loading.value
    console.log(recipe.value)
})
</script>