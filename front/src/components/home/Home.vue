<script setup lang="ts">
import LeftNavBar from "./LeftNavBar.vue";
import { useUserStore } from "../../store/userstore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { emitEvent, connectToServer } from "../../utils/ws";
import { useFriendsStore } from "../../store/friendsstore";

const userStore = useUserStore();
const router = useRouter();

const friendsStore = useFriendsStore();

onMounted(async () => {
  let res = await userStore.auth();
  if (!res) {
    router.push("/login");
  }

  friendsStore.getFriends();
  await connectToServer();
  emitEvent({ event: "event", data: "test" });
});
</script>

<template>
  <div class="w-screen h-screen flex bg-grey-300">
    <LeftNavBar />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
