<script setup lang="ts">
const { number } = defineProps(["number"]);
</script>

<template>
  <!-- notification circle -->
  <div class="absolute -bottom-1 right-2 h-6 w-6 rounded-full bg-grey-100 flex justify-center items-center">
    <div class="h-4 w-4 bg-red rounded-full flex justify-center items-center font-bold text-white-600 text-xs">
      {{ number }}
    </div>
  </div>
</template>

<style scoped></style>
