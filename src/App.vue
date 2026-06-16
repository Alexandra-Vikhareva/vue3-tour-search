<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import ToursSearch from './components/ToursSearch.vue';
import CitySelect from './components/CitySelect.vue';
import TourCard from './components/TourCard.vue';

import type { Tour } from './types/tour.ts';
import type { Activity } from './types/activity.ts';
import Loader from './components/Loader.vue';

const tours = ref<Tour[]>([]);
const searchQuery = ref('');
const selectedCityId = ref(null);
const data = ref(null);
const error = ref(null);
const loading = ref(true);

onMounted(()=> {
  fetch('/api/products?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com')
    .then(response => {
      if (response.status>=400)
        throw new Error('server error')
      return response.json()})
    .then(res => {tours.value = res.map(((item:Activity) => {
      const tour = {
        id: item.id,
        title: item.title,
        city_id: item.city_id,
        rating: item.customers_review_rating,
        reviews: item.reviews,
        base_price: item.base_price.price,
        image: item.main_photo.big,
      }
      return tour
    }))
    })
    .catch((err) => error.value = err)
    .finally(() => loading.value = false)
})


const filteredTours = computed<Tour[]>(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return tours.value.filter((tour) => {
    return (
      (!selectedCityId.value || tour.city_id === selectedCityId.value) 
      && (!query || tour.title.toLowerCase().includes(query)))
  })
})

const isEmptyList = computed(() => {
  return filteredTours.value.length === 0
})

function handleClick() {
  searchQuery.value = '';
  selectedCityId.value = null;
}

</script>

<template>
  <div v-if="error">Ошибка: {{ error }}</div>

  <div class="filters">
    <ToursSearch 
      v-model="searchQuery"/>
    <CitySelect 
      v-model="selectedCityId"/>
  </div>
  
  <div v-if="loading">
    <Loader/>
  </div>
  <div 
    v-else-if="isEmptyList"
    class="empty-list">

    <h1>Поиск не дал результатов</h1>
    <button 
      type="button"
      @click="handleClick()">
      Сбросить фильтры
    </button>

  </div>
  <div 
    v-else
    class="tour-list">
    <div v-for="tour in filteredTours">
      <TourCard 
        :title="tour.title"
        :id="tour.id"
        :city_id="tour.city_id"
        :rating="tour.rating"
        :reviews="tour.reviews"
        :base_price="tour.base_price"
        :image="tour.image"/>
    </div>
  </div>
</template>

<style scoped>
.tour-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
  margin: 90px 0;
}

.filters{
  display: flex;
  gap: 30px;
  justify-content: center;
  margin: 50px 0;
}

.empty-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 20px;
  gap: 30px;
  margin: 200px 0;
}

.empty-list h1 {
  line-height: 34px;
  font-size: 24px;
}

.empty-list button {
  line-height: 40px;
  font-size: 14px;
  height: 40px;
  width: 200px;
  background-color: var(--primary-button-color);
  color: white;
}
</style>