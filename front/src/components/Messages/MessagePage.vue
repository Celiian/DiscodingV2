<script setup lang="ts">
import MainContent from "../home/MainContent.vue";
import MessageHeader from "./MessageHeader.vue";
import MessagePageContent from "./MessagePageContent.vue";
import { useUserStore } from "../../store/userstore";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const userStore = useUserStore();

const routes = useRoute();
const friend = ref(null);

watchEffect(async () => {
  friend.value = (await userStore.getUser({ id: routes.params.friendId as string })).data;
});
</script>

<template>
  <MainContent>
    <template v-slot:header> <MessageHeader :friend="friend" /></template>
    <template v-slot:content> <MessagePageContent :friend="friend" /></template>
  </MainContent>
</template>

<style scoped></style>
