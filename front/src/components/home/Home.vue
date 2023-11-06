<script setup lang="ts">
import LeftNavBar from "./LeftNavBar.vue";
import DetailNav from "./DetailNav.vue";
import MainContent from "./MainContent.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-grey-300">
    <LeftNavBar/>
    <DetailNav/>
    <MainContent/>
  </div>
</template>

<style scoped>

</style>
