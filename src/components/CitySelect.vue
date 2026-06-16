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
    <div class="city-select">
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