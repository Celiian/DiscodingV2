<script setup lang="ts">
import AddCategoryIcon from "../svg/AddCategory.vue"

const emit = defineEmits(["open-modal"]);

//METHODS
function openModal(){
    emit("open-modal");
}
</script>

<template>

<div class="relative">
    <AddCategoryIcon @click="openModal" />
</div>

</template>

<style scoped>

</style>