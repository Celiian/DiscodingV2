<script setup lang="ts">
import AddServerIcon from "../circle-components/AddServerIcon.vue";
import PrivateMessageCircleIcon from "../circle-components/PrivateMessageCircleIcon.vue";
import SearchServerIcon from "../circle-components/SearchServerIcon.vue";
import ServerCircleIcon from "../circle-components/ServerCircleIcon.vue";
import { useServerStore } from "../../store/serverstore";
import { ref, watchEffect } from "vue";

interface Server {
  name: string;
  icon: string;
  _id: string;
}

const serverStore = useServerStore();

const serverList = ref<Server[]>([]);

watchEffect(() => {
  const server = serverStore.getServerList();

  serverList.value = server;
});
</script>
<template>
  <nav class="w-[72px] min-w-[72px] bg-grey-100 pt-3 h-[100vh] overflow-y-scroll">
    <router-link to="/me/friends">
      <PrivateMessageCircleIcon />
    </router-link>

    <div class="w-full flex justify-center mb-2">
      <div class="w-[32px] h-[2px] bg-grey-400"></div>
    </div>

    <!-- Conditional rendering of ServerCircleIcon -->
    <ServerCircleIcon v-if="serverList.length > 0" v-for="server in serverList" :name="server.name"
      :image-url="server.icon" :id="server._id" />

    <AddServerIcon />
    <SearchServerIcon />
  </nav>
</template>

<style scoped>
nav::-webkit-scrollbar {
  display: none;
}
</style>
../../store/serverStore
