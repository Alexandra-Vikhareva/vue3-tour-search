<script setup lang="ts">
import { ref, computed } from 'vue';

import ToursSearch from './components/ToursSearch.vue';
import CitySelect from './components/CitySelect.vue';
import TourCard from './components/TourCard.vue';

interface Tour {
  id: number;
  title: string;
  city_id: number;
  rating: number;
  reviews: number;
  base_price: string;
  image: string;
}

const tours: Tour[] = [
  { 
    id: 1, 
    title: 'Обзорная экскурсия по Москве на автобусе', 
    city_id: 1,
    rating: 4.7,
    reviews: 4016,
    base_price: '900 ₽',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/quality/best/'
  },
  { 
    id: 2, 
    title: 'Красная площадь и Кремль — пешеходная экскурсия', 
    city_id: 1,
    rating: 4.9,
    reviews: 2350,
    base_price: '1 200 ₽',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/quality/best/'
  },
  { 
    id: 3, 
    title: 'Сокровища Московского метро', 
    city_id: 1,
    rating: 4.5,
    reviews: 890,
    base_price: '750 ₽',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/quality/best/'
  },
  { 
    id: 4, 
    title: 'Петергоф — столица фонтанов', 
    city_id: 2,
    rating: 4.8,
    reviews: 467,
    base_price: '2 500 ₽',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/quality/best/'
  },
  { 
    id: 5, 
    title: 'Эрмитаж: шедевры мирового искусства', 
    city_id: 2,
    rating: 4.9,
    reviews: 5120,
    base_price: '1 800 ₽',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/quality/best/'
  },
  { 
    id: 6, 
    title: 'Ночная экскурсия по рекам и каналам', 
    city_id: 2,
    rating: 4.6,
    reviews: 1200,
    base_price: '2 200 ₽',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/quality/best/'
  },
  { 
    id: 7, 
    title: 'Казанский Кремль и мечеть Кул-Шариф', 
    city_id: 3,
    rating: 4.8,
    reviews: 780,
    base_price: '1 100 ₽',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/quality/best/'
  },
  { 
    id: 8, 
    title: 'Остров-град Свияжск', 
    city_id: 3,
    rating: 4.4,
    reviews: 320,
    base_price: '950 ₽',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/quality/best/'
  },
  { 
    id: 9, 
    title: 'Вечерняя Казань с подсветкой', 
    city_id: 3,
    rating: 4.7,
    reviews: 1450,
    base_price: '1 300 ₽',
    image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/21472675-1a5d-4742-bebc-1ec487128b62/-/quality/best/'
  }
];

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
</template>

<style scoped>
.tour-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
}
</style>