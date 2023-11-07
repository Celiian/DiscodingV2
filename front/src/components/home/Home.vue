<script setup lang="ts">
import LeftNavBar from "./LeftNavBar.vue";
import { useUserStore } from "../../store/userstore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useServerStore } from "../../store/serverstore";

const userStore = useUserStore();
const serverStore = useServerStore();
const router = useRouter();

onMounted(async () => {
  let res = await userStore.auth();
  if (!res) {
    router.push("/login");
  }
  await serverStore.getServerByUser();
});
</script>

<template>
  <div class="w-screen h-screen flex bg-grey-300">
    <LeftNavBar />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
