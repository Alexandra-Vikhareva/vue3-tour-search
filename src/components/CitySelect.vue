<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { City, CityResponse } from '../types/city';

const selectedCityId = defineModel<Number | null>()
const cities = ref<City[]>([])
const error = ref(null)

onMounted(() => {
    fetch('/api/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com')
    .then(response => {
      if (response.status>=400)
        throw new Error('server error')
      return response.json()})
    .then((res => {cities.value = res.map(((item:CityResponse) => {
      const tour = {
        id: item.id,
        name: item.name,
      }
      return tour
    }))
    }))
    .catch((err) => error.value = err)
})

</script>

<template>
    <div v-if="error">Ошибка загрузки городов: {{ error }}</div>
    <div v-else-if="cities" class="city-select">
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
    </div>
    
</template>

<style scoped>
.city-select{
    height: 50px;
    width: 300px;
    position: relative;
    display: inline-block;
}

.city-select select{
    appearance: none;
    width: 100%;
    height: 100%;
    border: 1px solid var(--base-dark-gray);
    color: var(--base-dark-gray);
    border-radius: 0;
    line-height: 21px;
    font-size: 16px;
    padding: 0 15px;

}

.city-select::after{
    content: "⏷";
    color: var(--base-dark-gray);
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
}

.city-select select:focus {
    outline: none;
}

.city-select option {
    color: var(--primary-text-color);
}
</style>