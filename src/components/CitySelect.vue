<script setup lang="ts">

interface City {
    id: number,
    name: string,
}

const selectedCityId = defineModel<Number | null>()

const cities: City[] = [
    {id: 1, name: 'Москва'}, 
    {id: 2, name: 'Санкт-Петербург'},
    {id: 3, name: 'Казань'}]
</script>

<template>
    <select 
        name="cities" 
        id="cities" 
        v-model="selectedCityId">

        <option 
            :value=null >
                Все города
        </option>
        <option 
            :value=city.id 
            v-for="city in cities">
                {{ city.name }}
        </option>

    </select>
</template>

<style scoped>
</style>