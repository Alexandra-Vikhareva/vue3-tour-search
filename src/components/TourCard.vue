<script setup lang="ts">
</script>

<template>
    <div class="card">
        <img src="/src/assets/Обложка.jpg" alt="/" class="photo">
        <div class="info">
            <div class="rate">
                <img src="/src/assets/star.svg" alt="/" class="star-svg">
                <span class="rating">4,8</span>
                <span class="reviews-quantity">(467)</span>
            </div>

            <div class="title">Храм Василия Блаженного: аудиоэкскурсия с билетом</div>
        </div>

        <div class="price">
            <div class="start-price">от 2 500 P</div>
            <div class="for">за экскурсию</div>
        </div>
    </div>
</template>

<style scoped>
.card{
    width: 345px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: 'PT Sans Caption';
}

.photo{
    width: 345px;
    height: 200px;
    border-radius: 5px;
}

.rate{
    line-height: 22px;
    display: flex;
    align-items: center;
    gap: 5px
}

.rating {
    font-size: 14px;
    color: var(--primary-text-color);
}

.reviews-quantity {
    font-size: 12px;
    color: var(--base-dark-gray)
}

.star-svg{
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