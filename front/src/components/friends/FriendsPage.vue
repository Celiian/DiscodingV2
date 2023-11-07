<script setup lang="ts">
import MainContent from "../home/MainContent.vue";

import FriendsHeader from "./FriendsHeader.vue";
import FriendsPageContent from "./FriendsPageContent.vue";

</script>
<template>
  <MainContent>
    <template v-slot:header> <FriendsHeader /></template>
    <template v-slot:content> <FriendsPageContent /></template>
  </MainContent>
</template>
<style scoped></style>
