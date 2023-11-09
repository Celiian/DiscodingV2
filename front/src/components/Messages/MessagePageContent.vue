<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import UploadIcon from "../svg/UploadIcon.vue";
import MessageComp from "./MessageComp.vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { emitEvent } from "../../utils/ws";
import { useMessageStore } from "../../store/messagestore";
import { useUserStore } from "../../store/userstore";
import { useNotifStore } from "../../store/notifstore";

const notifStore = useNotifStore();
const userStore = useUserStore();
const messagestore = useMessageStore();
const messageInput = ref("");
const routes = useRoute();

interface Message {
  channel: string;
  sender: string;
  content: string;
  date: Date;
}
const messages = computed<Message[]>(() => {
  return messagestore.getMessages();
});

watch(messages, () => {
  setTimeout(() => scrollToElement(), 100);
});

const friend = ref();

const channelId = computed(() => {
  return routes.params.channelId as string;
});

watchEffect(async () => {
  const mp_notifs = notifStore.getCurrentMpNotifs();

  const foundNotif: any = mp_notifs.find((notif: any) => {
    return notif.sender === routes.params.friendId && notif.source_id === routes.params.channelId;
  });

  if (foundNotif) {
    notifStore.deleteNotif(foundNotif._id.toString());
  }

  friend.value = (await userStore.getUser({ id: routes.params.friendId as string })).data;
  emitEvent({ event: "mp-join", data: { channel: channelId.value } });
  await messageStore.getMessagesByChannel(channelId.value);
});

onBeforeRouteLeave(() => {
  emitEvent({ event: "mp-leave", data: { channel: channelId.value } });
});

//METHOD
function onClickUploadButton() {
  console.log("upload button click");
}

function sendMessage() {
  messagestore.mp({
    sender: userStore.getCurrentUser()._id.toString(),
    content: messageInput.value,
    channel: channelId.value,
    friend: friend.value._id.toString(),
  });
  messageInput.value = "";
}
function formatDateToFrench(dateString: string) {
  const date = new Date(dateString);
  const locale = "fr-FR";
  return date.toLocaleDateString(locale);
}

function scrollToElement() {
  console.log("scroll");
  const el = document.getElementsByClassName("last")[0];

  if (el) {
    el.scrollIntoView();
  }
}
</script>

<template>
  <div class="relative w-full message_height flex flex-col">
    <div class="message-view overflow-y-scroll message_height_2">
      <!--message list content-->
      <MessageComp
        v-for="(message, index) in messages"
        :key="index"
        v-bind="{
          userName: message.sender == friend._id ? friend.username : userStore.getCurrentUser().username,
          date: formatDateToFrench(message.date.toString()),
          messageContent: message.content,
          icon: userStore.getCurrentUser()?.icon || '/src/assets/discord.neutral.png',
        }"
        :class="index == messages.length - 1 ? 'last' : undefined"
      />
    </div>

    <!--input message-->
    <div class="relative px-4 mt-2">
      <div class="relative mb-[24px] w-full rounded-lg indent-0 bg-white-100/10">
        <div class="flex overflow-x-hidden overflow-y-scroll max-h-[50vh] rounded-lg pl-4">
          <!--upload icon-->
          <div class="h-[44px] w-auto py-[10px] px-[16px] -ml-4">
            <div class="group" @click="onClickUploadButton">
              <UploadIcon class="fill-white-300 group-hover:fill-white-400 cursor-pointer" />
            </div>
          </div>

          <!-- input message-->
          <div class="h-[44px] flex-1 py-[11px] pr-[10px] flex items-center">
            <input
              @keypress.enter="sendMessage"
              v-model="messageInput"
              class="bg-black/0 placeholder:text-white-100/50 w-full outline-none text-white-400"
              type="text"
              placeholder="Envoyer un message a Titi"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1e1f22;
  border-radius: 20px;
}
</style>
