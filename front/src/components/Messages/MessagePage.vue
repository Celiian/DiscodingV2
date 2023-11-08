<script setup lang="ts">
import MainContent from "../home/MainContent.vue";
import MessageHeader from "./MessageHeader.vue";
import MessagePageContent from "./MessagePageContent.vue";
</script>


<template>
    <MainContent>
      <template v-slot:header> <MessageHeader /></template>
      <template v-slot:content> <MessagePageContent /></template>
    </MainContent>
  </template>


<style scoped>
</style>
