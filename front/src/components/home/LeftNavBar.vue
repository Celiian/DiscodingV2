<script setup lang="ts">
import AddServerIcon from "../circle-components/AddServerIcon.vue";
import PrivateMessageCircleIcon from "../circle-components/PrivateMessageCircleIcon.vue";
import SearchServerIcon from "../circle-components/SearchServerIcon.vue";
import ServerCircleIcon from "../circle-components/ServerCircleIcon.vue";
import { useServerStore } from "../../store/serverstore";
import { ref, watchEffect } from "vue";
import { useNotifStore } from "../../store/notifstore";
import { useUserStore } from "../../store/userstore";
interface Server {
  name: string;
  icon: string;
  _id: string;
}

const serverStore = useServerStore();
const notifStore = useNotifStore();
const userStore = useUserStore();

const serverList = ref<Server[]>([]);

const mp_notif = ref<Array<any>>([]);

const userList = ref(new Map<string, any>());

async function getUserList() {
  for (const notif of mp_notif.value) {
    const user = (await userStore.getUser(notif.sender)).data;
    if (!userList.value.has(user._id)) {
      userList.value.set(user._id, user);
    }
  }
}

watchEffect(async () => {
  const server = serverStore.getServerList();
  serverList.value = server;

  mp_notif.value = notifStore.getCurrentMpNotifs();
  console.log(mp_notif.value);
  await getUserList();
});
</script>
<template>
  <nav class="w-[72px] min-w-[72px] bg-grey-100 pt-3 h-[100vh] overflow-y-scroll">
    <router-link to="/me/friends">
      <PrivateMessageCircleIcon />
    </router-link>

    <ServerCircleIcon
      v-for="notif in mp_notif"
      :name="userList.get(notif.sender)?.username || ''"
      :image-url="userList.get(notif.sender)?.icon || '/src/assets/discord-mark-white.svg'"
      :link="'/me/message/' + notif.source_id + '/' + notif.sender"
      :notif="true"
      :count="notif.count"
    />

    <div class="w-full flex justify-center mb-2">
      <div class="w-[32px] h-[2px] bg-grey-400"></div>
    </div>

    <!-- Conditional rendering of ServerCircleIcon -->
    <ServerCircleIcon
      v-if="serverList.length > 0"
      v-for="server in serverList"
      :name="server.name"
      :image-url="server.icon"
      :link="'/server/' + server._id"
      :notif="false"
      :count="0"
    />

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
