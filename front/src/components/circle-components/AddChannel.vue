<script setup lang="ts">
import AddChannelIcon from "../svg/AddChannel.vue"
const emit = defineEmits(["open-modal"]);

//METHODS
function openModal(){
    emit("open-modal");
}
</script>

<template>

<div class="relative">
    <AddChannelIcon @click="openModal" />
</div>

</template>

<style scoped>

</style>