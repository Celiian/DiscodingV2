<script setup lang="ts">
import ServerMessageHeader from "./ServerMessageHeader.vue";
import MessagePageContent from "../Messages/MessagePageContent.vue";
import MainContent from "../home/MainContent.vue";
</script>

<template>
  <MainContent>
    <template v-slot:header>
      <ServerMessageHeader />
    </template>
    <template v-slot:content>
      <MessagePageContent />
    </template>
  </MainContent>
</template>

<style scoped></style>
