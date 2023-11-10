<script setup lang="ts">
import LeftNavBar from "./LeftNavBar.vue";
import { useUserStore } from "../../store/userstore";
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { connectToServer, disconnectFromServer } from "../../utils/ws";
import { useFriendsStore } from "../../store/friendsstore";
import { useServerStore } from "../../store/serverstore";
import { useMessageStore } from "../../store/messagestore";
import { useNotifStore } from "../../store/notifstore";

const userStore = useUserStore();
const serverStore = useServerStore();
const messagestore = useMessageStore();
const friendsStore = useFriendsStore();
const notifStore = useNotifStore();
const router = useRouter();

onMounted(async () => {
  let res = await userStore.auth();
  if (!res) {
    router.push("/login");
  } else {
    await messagestore.getMpChannels();
    serverStore.getServerByUser();
    await friendsStore.getFriends();
    await notifStore.getNotifs();
    await connectToServer();
  }

  if (router.currentRoute.value.path == "/") {
    router.push("/me/friends");
  } else if (router.currentRoute.value.path == "/me") {
    router.push("/me/friends");
  }
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
