<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import UploadIcon from "../svg/UploadIcon.vue";
import MessageComp from "./MessageComp.vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { emitEvent } from "../../utils/ws";
import { useMessageStore } from "../../store/messagestore";
import { useUserStore } from "../../store/userstore";
import { useNotifStore } from "../../store/notifstore";
import { defineProps } from "vue";
import { deleteNotif } from "../../store/utils/notifrequest";

const notifStore = useNotifStore();
const userStore = useUserStore();
const messagestore = useMessageStore();
const messageInput = ref("");
const routes = useRoute();
const props = defineProps({
  friend: null,
});

interface Message {
  _id: string;
  channel: string;
  sender: string;
  content: string;
  date: Date;
}
const userList = ref(new Map<string, any>());
const serverNotif = computed(() => {
  return notifStore.getServerNotifs();
});
const searchedMessage = computed(() => {
  return messagestore.getSearchedMessage();
});

const channelId = computed(() => {
  return routes.params.channelId as string;
});

watch(searchedMessage, () => {
  scrollToElement(searchedMessage.value, true);

  messagestore.setSearchedMessage("");
});

async function deleteNotif() {
  for (let notif of serverNotif.value) {
    if (notif.source_id == channelId.value.toString()) {
      await notifStore.deleteNotif(notif._id.toString());
    }
  }
}
watch(serverNotif, async () => {
  await deleteNotif();
});

watch(channelId, async () => {
  await deleteNotif();
});

const messages = computed<Message[]>(() => {
  return messagestore.getMessages();
});

watch(messages, async () => {
  await getUserList();
  setTimeout(() => scrollToElement(messages.value[messages.value.length - 1]._id, false), 100);
});

watchEffect(async () => {
  if (props.friend) {
    const mp_notifs = notifStore.getCurrentMpNotifs();

    const foundNotif: any = mp_notifs.find((notif: any) => {
      return notif.sender === routes.params.friendId && notif.source_id === routes.params.channelId;
    });

    if (foundNotif) {
      notifStore.deleteNotif(foundNotif._id.toString());
    }

    emitEvent({ event: "mp-join", data: { channel: channelId.value } });
  } else {
    emitEvent({ event: "chan-join", data: { channel: channelId.value } });
    await deleteNotif();
  }
  await messagestore.getMessagesByChannel(channelId.value);
});

onBeforeRouteLeave(() => {
  if (props.friend) {
    emitEvent({ event: "mp-leave", data: { channel: channelId.value } });
  } else {
    emitEvent({ event: "chan-leave", data: { channel: channelId.value } });
  }
  messagestore.leaveChannel();
});

//METHOD
function onClickUploadButton() {
  console.log("upload button click");
}

function sendMessage() {
  if (props.friend) {
    messagestore.mp({
      sender: userStore.getCurrentUser()._id.toString(),
      content: messageInput.value,
      channel: channelId.value,
      friend: props.friend?._id.toString(),
    });
  } else {
    messagestore.messaage({
      sender: userStore.getCurrentUser()._id.toString(),
      content: messageInput.value,
      channel: channelId.value,
      server: routes.params.serverId.toString(),
    });
  }
  messageInput.value = "";
}

function formatDateToFrench(dateString: string) {
  const date = new Date(dateString);
  const locale = "fr-FR";
  return date.toLocaleDateString(locale);
}

function scrollToElement(className: string, blink: boolean) {
  const el = document.getElementsByClassName(className.toString())[0];

  if (el) {
    el.scrollIntoView();

    if (blink) {
      el.classList.add("blink-blue");

      setTimeout(() => {
        el.classList.remove("blink-blue");
      }, 700);
    }
  }
}

async function getUserList() {
  for (const message of messages.value) {
    const user = (await userStore.getUser({ id: message?.sender })).data;
    if (!userList.value.has(user._id)) {
      userList.value.set(user._id, user);
    }
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
          userName: userList.get(message.sender)?.username,
          date: formatDateToFrench(message.date.toString()),
          messageContent: message.content,
          icon: userList.get(message.sender)?.icon,
        }"
        :class="message._id.toString()"
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

@keyframes blink-blue {
  0%,
  100% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(70, 70, 212, 0.263);
  }
}

.blink-blue {
  animation: blink-blue 0.7s infinite;
}
</style>
