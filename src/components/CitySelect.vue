<script setup lang="ts">
import { ref } from 'vue';

interface City {
    id: number,
    name: string,
}

const selectedCityId = ref(null);
const cities: City[] = [{id: 1, name: 'Москва'}, 
                        {id: 2, name: 'Санкт-Петербург'},
                        {id: 3, name: 'Казань'}]
</script>

<template>
    <select name="cities" 
            id="cities" 
            v-model="selectedCityId" 
            @change="console.log(selectedCityId)">

        <option :value=null 
                disabled>
                    Все города
        </option>
        <option :value=city.id 
                v-for="city in cities">
                    {{ city.name }}
        </option>
        
    </select>
</template>

<style scoped>
</style>