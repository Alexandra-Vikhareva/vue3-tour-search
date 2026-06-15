<script setup lang="ts">
const searchQuery = defineModel<String>()

</script>

<template>
    <input 
        v-model="searchQuery"
        placeholder="Введите название экскурсии"/>
</template>

<style scoped>
</style>