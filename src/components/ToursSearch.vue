<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('')
</script>

<template>
    <h1>Сообщение: {{ searchQuery }}</h1>

    <input 
        v-model="searchQuery"
        placeholder="Введите название экскурсии" />
</template>

<style scoped>
</style>