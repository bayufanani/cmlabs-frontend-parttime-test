<template>
    <div class="container">
        <div v-if="pending">
            <p>Loading...</p>
        </div>
        <div v-else-if="recipe">
            <div class="flex flex-col md:flex-row gap-4 items-center card p-8 mb-8">
                <div class="flex-grow flex flex-col gap-4">
                    <div class="flex gap-4 items-center">
                        <span class="recipe-category !bg-green-600 text-white">{{ recipe.strCategory }}</span>
                        <span class="recipe-area !bg-teal-600 text-white">{{ recipe.strArea }}</span>
                    </div>

                    <h1 class="recipe-title text-green-900">{{ recipe.strMeal }}</h1>
                    <div class="tags flex flex-row gap-2 flex-wrap">
                        <span class="recipe-tag border border-orange-300 bg-orange-200"
                            v-for="tag in recipe.strTags?.split(',')" :key="tag">{{
                                tag }}</span>
                    </div>
                </div>
                <div class="flex-grow order-[-1] md:order-none w-full md:w-auto">
                    <img :src="recipe.strMealThumb" :alt="recipe.strMeal" loading="lazy" class="w-80 m-auto recipe-img">
                </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4">
                <div class="card">
                    <h3 class="font-bold text-2xl mb-4 text-green-800">Ingredients</h3>
                    <div class="w-full md:w-80 flex flex-col gap-2">
                        <div v-for="ingredient in ingredients" :key="ingredient.ingredient"
                            class="flex flex-row border-b border-gray-200 py-2">
                            <div class="flex-grow">{{ ingredient.ingredient }}</div>
                            <div class="rounded-full bg-orange-100 px-4 text-orange-800 py-1 text-xs">{{
                                ingredient.measure }}</div>
                        </div>
                    </div>
                </div>
                <div class="card flex flex-col gap-2">
                    <h3 class="font-bold text-2xl mb-4 text-green-800">Instructions</h3>
                    <p class="whitespace-pre-line leading-8">{{ recipe.strInstructions }}</p>
                    <iframe class="mt-8 w-full h-96" :src="recipe.strYoutube.replace('watch?v=', 'embed/')"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ApiResponse } from '~/domains/api-response'
import type { Recipe, RecipeIngredient } from '~/domains/recipe'

const route = useRoute()
const meal_id = route.params.meal_id
const recipe = ref<Recipe | null>()
const pending = ref(true)
const ingredients = computed<RecipeIngredient[]>(() => {
    let ingredientList: RecipeIngredient[] = []
    if (recipe.value == null || recipe.value == undefined) {
        return []
    }
    for (let i = 1; i <= 20; i++) {
        const ingredientName = recipe.value["strIngredient" + i as keyof typeof recipe.value]
        const ingredientAmount = recipe.value["strMeasure" + i as keyof typeof recipe.value]
        if (ingredientName == null || ingredientName == "") {
            continue
        }
        ingredientList.push({
            ingredient: ingredientName,
            measure: ingredientAmount
        })
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