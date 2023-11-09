<script setup lang="ts">
const props = defineProps({
  icon: String,
});
</script>

<template>
  <img :src="props.icon" class="w-full h-full shrink-0 relative rounded-full mr-3 object-cover" />
</template>

<style scoped></style>
