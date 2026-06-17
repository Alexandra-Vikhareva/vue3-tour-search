<template>
  <div class="loader-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid white;
  border-top: 4px solid var(--primary-button-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
