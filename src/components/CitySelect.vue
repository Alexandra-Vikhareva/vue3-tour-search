<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import type { City, CityResponse } from "../types/city";

const selectedCityId = defineModel<number | null>();
const usedCitiesId = defineProps<{ cities: Set<Number> }>();
const allCities = ref<City[]>([]);
const cities = computed(() =>
  allCities.value.filter((city) => usedCitiesId.cities.has(city.id))
);
const error = ref(null);
const isOpen = ref(false);
const apiBase = import.meta.env.VITE_API_BASE_URL

onMounted(() => {
  fetch(
    `${apiBase}/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com`,
  )
    .then((response) => {
      if (response.status >= 400) throw new Error("server error");
      return response.json();
    })
    .then((res) => {
      allCities.value = res.map((item: CityResponse) => ({
        id: item.id,
        name: item.name,
      }));
    })
    .catch((err) => (error.value = err));

  document.addEventListener("click", closeOnOutsideClick);
});

const selectedLabel = computed(() => {
  if (selectedCityId.value === null) return "Все города";
  const found = cities.value.find((city) => city.id === selectedCityId.value);
  return found ? found.name : "Выберите город";
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (id: number | null) => {
  selectedCityId.value = id;
  isOpen.value = false;
};

const closeOnOutsideClick = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".custom-select")) {
    isOpen.value = false;
  }
};
</script>

<template>
  <div v-if="error">Ошибка загрузки городов: {{ error }}</div>

  <div v-else class="custom-select">
    <div class="select-trigger" @click="toggleDropdown">
      <span class="selected-text">
        {{ selectedLabel }}
      </span>
      <span class="arrow" :class="{ open: isOpen }"> ⏷ </span>
    </div>

    <transition>
      <ul v-if="isOpen" class="dropdown-list">
        <li
          class="dropdown-item"
          :class="{ active: selectedCityId === null }"
          @click="selectOption(null)"
        >
          Все города
        </li>
        <li
          v-for="city in cities"
          :key="city.id"
          class="dropdown-item"
          :class="{ active: selectedCityId === city.id }"
          @click="selectOption(city.id)"
        >
          {{ city.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: 300px;
  height: 50px;
  display: inline-block;
  font-family: inherit;
  font-size: 16px;
  user-select: none;
}

.select-trigger {
  width: 100%;
  height: 100%;
  border: 1px solid var(--base-dark-gray);
  color: var(--base-dark-gray);
  background: white;
  border-radius: 0;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: border-color 0.2s;
}

.arrow {
  font-size: 16px;
  transition: transform 0.2s;
  pointer-events: none;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown-list {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  color: var(--primary-text-color);
}

.dropdown-item:hover {
  background: var(--primary-button-color);
  color: white;
}
</style>