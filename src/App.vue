<script setup lang="ts">
import { ref, computed } from 'vue';

import ToursSearch from './components/ToursSearch.vue';
import CitySelect from './components/CitySelect.vue';
import TourCard from './components/TourCard.vue';

interface Tour {
  id: number,
  title: string,
  city_id: number
}

const tours: Tour[] = [
  { id: 1, title: 'Обзорная экскурсия по Москве на автобусе', city_id: 1 },
  { id: 2, title: 'Красная площадь и Кремль — пешеходная экскурсия', city_id: 1 },
  { id: 3, title: 'Сокровища Московского метро', city_id: 1 },
  { id: 4, title: 'Петергоф — столица фонтанов', city_id: 2 },
  { id: 5, title: 'Эрмитаж: шедевры мирового искусства', city_id: 2 },
  { id: 6, title: 'Ночная экскурсия по рекам и каналам', city_id: 2 },
  { id: 7, title: 'Казанский Кремль и мечеть Кул-Шариф', city_id: 3 },
  { id: 8, title: 'Остров-град Свияжск', city_id: 3 },
  { id: 9, title: 'Вечерняя Казань с подсветкой', city_id: 3 }
]

const searchQuery = ref('');
const selectedCityId = ref(null);
const filteredTours = computed<Tour[]>(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return tours.filter((tour) => {
    return (
      (!selectedCityId.value || tour.city_id === selectedCityId.value) 
      && (!query || tour.title.toLowerCase().includes(query)))
  })
})

</script>

<template>
  <ToursSearch 
    v-model="searchQuery"/>
  <CitySelect 
    v-model="selectedCityId"/>

  <p>{{ filteredTours }}</p>

  <TourCard></TourCard>
</template>