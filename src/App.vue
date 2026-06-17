<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Fuse from 'fuse.js';

import ToursSearch from './components/ToursSearch.vue';
import CitySelect from './components/CitySelect.vue';
import TourCard from './components/TourCard.vue';
import Logo from './components/Logo.vue';

import type { Tour } from './types/tour.ts';
import type { Activity } from './types/activity.ts';
import Loader from './components/Loader.vue';

const tours = ref<Tour[]>([]);
const searchQuery = ref('');
const selectedCityId = ref(null);
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

const fuse = computed(() => {
  return new Fuse(
    tours.value,
    {
      keys: ['title'],
      threshold: 0.4,
      ignoreLocation: true,
    }
  )
})

const filteredTours = computed<Tour[]>(() => {
  const query = searchQuery.value.toLowerCase().trim()
  
  if (!query) {
    if (selectedCityId.value != null) 
      return tours.value.filter(tour => tour.city_id === selectedCityId.value)
    return tours.value
  }

  const foundTours = fuse.value.search(query).map(tour => tour.item)

  if (selectedCityId.value != null) 
    return foundTours.filter(tour => tour.city_id === selectedCityId.value)

  return foundTours
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
  <header class="header">
    <div class="logo-wrapper">
      <Logo class="logo" />
    </div>
    <h1 class="catch-phrase">Экскурсии по всему миру</h1>
  </header>

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
  <div v-else class="tour-list-wrapper">
    <div class="tour-list">
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
  </div>
  
</template>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
}

.catch-phrase {
  font-size: 48px;
  line-height: 68px;
  font-weight: 700;
  padding: 0 15px;
  text-align: center;
}

.tour-list-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.tour-list{
  display: grid;
  grid-template-columns: repeat(auto-fit, 345px);
  gap: 50px;
  max-width: 1135px;
  margin: 90px auto;
  box-sizing: border-box;
}

@media (max-width: 1135px) {
  .tour-list {
    grid-template-columns: repeat(2, 345px);
    max-width: 740px;
  }
}

@media (max-width: 740px) {
  .tour-list {
    grid-template-columns: 345px;
    max-width: 345px;
  }
}

.filters{
  display: flex;
  gap: 30px;
  justify-content: center;
  margin: 50px 0;
}

@media (max-width: 740px) {
  .filters {
    flex-direction: column;
    align-items: center;
  }
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
  margin: 180px 0 0 0;
}

@media (max-width: 740px) {
  .empty-list {
    margin: 50px 0 0 0;
  }
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