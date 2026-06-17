<script setup lang="ts">
import type { Tour } from "../types/tour";
const props = defineProps<{
  tour: Tour;
}>();
</script>

<template>
  <div class="card">
    <img :src="tour.image" :alt="tour.title" class="photo" />
    <div class="info">
      <div class="rate">
        <img src="/star.svg" class="star-svg" />
        <span class="rating">{{ props.tour.rating }}</span>
        <span class="reviews-quantity">({{ props.tour.reviews }})</span>
      </div>

      <div class="title">{{ props.tour.title }}</div>
    </div>

    <div class="price">
      <div class="start-price">от {{ props.tour.base_price }}</div>
      <div class="for">за экскурсию</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 345px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.photo {
  width: 345px;
  height: 200px;
  border-radius: 5px;
  object-fit: cover;
}

.rate {
  line-height: 22px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.rating {
  font-size: 14px;
  color: var(--primary-text-color);
}

.reviews-quantity {
  font-size: 12px;
  color: var(--base-dark-gray);
}

.star-svg {
  height: 16px;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--base-black);
}

.start-price {
  line-height: 32px;
  font-size: 22px;
  font-weight: 600;
  color: var(--primary-text-color);
}

.for {
  line-height: 22px;
  font-size: 12px;
  color: var(--base-dark-gray);
}
</style>
