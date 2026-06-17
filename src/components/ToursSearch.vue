<script setup lang="ts">
import Autocomplete from '@trevoreyre/autocomplete-vue';
import { ref } from 'vue';

const query = defineModel<string>({ required: true });
const props = defineProps<{items: string[]}>();
const autocompleteRef = ref<InstanceType<typeof Autocomplete> | null>(null);

function search(input: string): string[] {
  if (input.length < 1) return [];
  const lower = input.toLowerCase();
  return props.items.filter(word =>
    word.toLowerCase().includes(lower)
  );
}

function clear() {
  query.value = '';
  autocompleteRef.value?.setValue(null);
}
defineExpose({ clear });

function handleInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value;
}
 
function handleSubmit(result: string) {
  query.value = result ?? '';
}

function clearInput() {
  query.value = '';
  autocompleteRef.value?.setValue('');
}
</script>

<template>
    <div class="tour-search">
        <Autocomplete
            ref="autocompleteRef"
            :search="search"
            :default-value="query"
            placeholder="Введите название экскурсии"
            class="autocomplete-wrapper"
            @input="handleInput"
            @submit="handleSubmit"
        />

        <button 
            class="clear-input"
            @click="clearInput()"
            v-if="query"
            type="button">
                ✕
        </button>
    </div>
</template>

<style scoped>
.tour-search {
    position: relative;
    display: inline-block;
    width: 300px;
    height: 50px;
}

:deep(.autocomplete-wrapper) {
    width: 100%;
    height: 100%;
}

:deep(.autocomplete) {
    width: 100%;
    height: 100%;
}

:deep(.autocomplete input) {
    width: 100%;
    height: 100%;
    border: 1px solid var(--base-dark-gray);
    color: var(--base-dark-gray);
    border-radius: 0;
    line-height: 21px;
    font-size: 16px;
    padding: 0 35px 0 15px;
    background: none;
    box-shadow: none;
    box-sizing: border-box;
}
 
:deep(.autocomplete input:focus) {
    outline: none;
    box-shadow: none;
}
 
:deep(.autocomplete-result-list) {
    background-color: white;
    border-radius: 0;
    border: 1px solid var(--base-dark-gray);
    border-top: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
}
 
:deep(.autocomplete-result) {
    font-size: 16px;
    color: var(--base-dark-gray);
    padding: 8px 15px;
}
 
:deep(.autocomplete-result:hover),
:deep(.autocomplete-result[aria-selected="true"]) {
    background-color: var(--primary-button-color);
    color: white;
}

.clear-input {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: var(--base-dark-gray);
    z-index: 1;
}
</style>