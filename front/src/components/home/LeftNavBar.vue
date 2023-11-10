<script setup lang="ts">
import AddServerIcon from "../circle-components/AddServerIcon.vue";
import PrivateMessageCircleIcon from "../circle-components/PrivateMessageCircleIcon.vue";
import SearchServerIcon from "../circle-components/SearchServerIcon.vue";
import ServerCircleIcon from "../circle-components/ServerCircleIcon.vue";
import { useServerStore } from "../../store/serverstore";
import { computed, ref, watch, watchEffect } from "vue";
import { useNotifStore } from "../../store/notifstore";
import { useUserStore } from "../../store/userstore";

const serverStore = useServerStore();
const notifStore = useNotifStore();
const userStore = useUserStore();

const serverList = computed(() => {
  return serverStore.getServerList();
});

interface Channel {
  _id: string;
  name: string;
  type: string;
  audio: boolean;
  users: [string, string];
}

const notifList = ref<{ [key: string]: boolean }>({});
const mentionList = ref<{ [key: string]: number }>({});

const mp_notif = ref<Array<any>>([]);
const serverNotifs = computed(() => {
  return notifStore.getServerNotifs();
});

const userList = ref(new Map<string, any>());

async function getUserList() {
  for (const notif of mp_notif.value) {
    const user = (await userStore.getUser({ id: notif.sender })).data;
    if (!userList.value.has(user._id)) {
      userList.value.set(user._id, user);
    }
  }
}

watch(serverNotifs, async () => {
  await updateServerNotifs();
});

watch(serverList, async () => {
  await updateServerNotifs();
});

async function updateServerNotifs() {
  for (let server of serverList.value) {
    const res = await serverStore.getChannelsServer(server?._id.toString());
    notifList.value[server?._id.toString()] = false;

    let channels = res.channels.map((chan: Channel) => chan._id.toString());

    for (const categoryId in res.categories) {
      if (res.categories.hasOwnProperty(categoryId)) {
        const category = res.categories[categoryId];
        for (let chan of category.channels) {
          channels.push(chan._id.toString());
        }
      }
    }

    for (let notif of notifStore.getServerNotifs()) {
      if (channels.includes(notif?.source_id)) {
        notifList.value[server?._id.toString()] = true;
        if (notif.type == "mention") {
          if (mentionList.value[server?._id.toString()]) {
            mentionList.value[server?._id.toString()] = mentionList.value[server?._id.toString()] + 1;
          } else {
            mentionList.value[server?._id.toString()] = 1;
          }
        } else {
          if (!mentionList.value[server?._id.toString()]) {
            mentionList.value[server?._id.toString()] = 0;
          }
        }
      }
    }
  }
}

watchEffect(async () => {
  mp_notif.value = notifStore.getCurrentMpNotifs();
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
      :image-url="userList.get(notif.sender)?.icon || '/src/assets/discord.neutral.png'"
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
      :notif="true"
      :count="mentionList[server._id.toString()]"
      :notif_small="notifList[server._id.toString()]"
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
