<script setup lang="ts">
const searchQuery = defineModel<String>()

</script>

<template>
    <div class="tour-search">
        <input 
            v-model="searchQuery"
            placeholder="Введите название экскурсии"/>

        <button class="clear-input">✕</button>
    </div>
    
</template>

<style scoped>
.tour-search {
    position: relative;
    display: inline-block;
    width: 300px;
    height: 50px;
}
.tour-search input{
    width: 100%;
    height: 100%;
    border: 1px solid var(--base-dark-gray);
    color: var(--base-dark-gray);
    border-radius: 0;
    line-height: 21px;
    font-size: 16px;
    padding: 0 15px;
}

.tour-search input:focus {
    outline: none;
}

.clear-input {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
}
</style>