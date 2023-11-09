<script setup lang="ts">
import LeftNavBar from "./LeftNavBar.vue";
import { useUserStore } from "../../store/userstore";
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { emitEvent, connectToServer, disconnectFromServer } from "../../utils/ws";
import { useFriendsStore } from "../../store/friendsstore";
import { useServerStore } from "../../store/serverstore";
import { useMessageStore } from "../../store/messagestore";

const userStore = useUserStore();
const serverStore = useServerStore();
const messageStore = useMessageStore();
const friendsStore = useFriendsStore();

const router = useRouter();

onMounted(async () => {
  let res = await userStore.auth();
  if (!res) {
    router.push("/login");
  }
  await messageStore.getMpChannels();
  await serverStore.getServerByUser();
  await friendsStore.getFriends();
  await connectToServer();
  emitEvent({ event: "event", data: "test" });
});

onBeforeUnmount(async () => {
  await disconnectFromServer();
});
</script>

<template>
  <div class="w-screen h-screen flex bg-grey-300">
    <LeftNavBar />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
