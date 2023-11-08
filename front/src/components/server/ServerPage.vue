<script setup lang="ts">
import MainContent from "../home/MainContent.vue";
import { useRoute } from "vue-router";
import DetailNav from "../home/DetailNav.vue";
import { useServerStore } from "../../store/serverstore";
import { ref, watchEffect } from "vue";

const serverStore = useServerStore();
const route = useRoute();
const server = ref<Server | null>(null); // Initialize as null

interface Server {
  name: string;
  icon: Blob;
  owner: string;
}

watchEffect(() => {
  const newServerId = route.params.serverId as string;
  server.value = null;
  serverStore.getServerById({ id: newServerId }).then((data) => {
    server.value = data;
  });
});
</script>

<template>
  <DetailNav>
    <template v-slot:header>
      <p class="text-white-600">
        {{ server?.name }}
      </p>
    </template>

    <template v-slot:content></template>
  </DetailNav>
  <MainContent>
    <template v-slot:header> header</template>
    <template v-slot:content> </template>
  </MainContent>
</template>

<style scoped></style>
