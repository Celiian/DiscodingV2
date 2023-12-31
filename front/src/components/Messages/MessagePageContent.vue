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

const notifStore = useNotifStore();
const userStore = useUserStore();
const messagestore = useMessageStore();
const messageInput = ref("");
const routes = useRoute();
const showModal = ref(false);

interface User {
  tag: String;
  email: string;
  username: string;
  password: string;
  token: string;
  createdAt: Date;
  icon: string;
}

interface Notification {
  _id: string;
  type: string;
  destined_user: string;
  source_id: string;
  sender: string;
  count: number;
}

import BinIcon from "../svg/BinIcon.vue";
import { uploadImage } from "../../store/utils/imageupload";

const props = defineProps({
  friend: null,
});

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

const messages = computed(() => {
  return messagestore.getMessages();
});

watch(messages, async () => {
  await getUserList();

  setTimeout(() => scrollToElement(messages.value[messages.value.length - 1]._id, false), messages.value.length * 10);
});

watchEffect(async () => {
  if (props.friend) {
    const mp_notifs = notifStore.getCurrentMpNotifs();

    const foundNotif = mp_notifs.find((notif: Notification) => {
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

const selectedFile = ref();
const selectedFileUrl = ref("");

function openFileInput() {
  const fileInput = document.getElementById("fileInput");
  fileInput?.click();

  fileInput?.addEventListener("change", async (event) => {
    selectedFile.value = (event.target as HTMLInputElement).files;
    selectedFileUrl.value = URL.createObjectURL(selectedFile.value[0]);
  });
}

async function sendMessage() {
  if (props.friend) {
    if (selectedFileUrl.value != "") {
      const res = await uploadImage(selectedFile.value);
      messagestore.mp({
        sender: userStore.getCurrentUser()!._id.toString(),
        content: messageInput.value,
        channel: channelId.value,
        friend: props.friend?._id.toString(),
        file_url: res[0].url,
      });
    } else {
      messagestore.mp({
        sender: userStore.getCurrentUser()!._id.toString(),
        content: messageInput.value,
        channel: channelId.value,
        friend: props.friend?._id.toString(),
        file_url: "",
      });
    }
  } else {
    if (selectedFileUrl.value != "") {
      const res = await uploadImage(selectedFile.value);
      messagestore.messageServer({
        sender: userStore.getCurrentUser()!._id.toString(),
        content: messageInput.value,
        channel: channelId.value,
        file_url: res[0].url,
        server: routes.params.serverId.toString(),
      });
    } else {
      messagestore.messageServer({
        sender: userStore.getCurrentUser()!._id.toString(),
        content: messageInput.value,
        channel: channelId.value,
        file_url: "",
        server: routes.params.serverId.toString(),
      });
    }
  }
  messageInput.value = "";
  selectedFileUrl.value = "";
}

function formatDateToFrench(dateString: string) {
  const date = new Date(dateString);
  const locale = "fr-FR";
  return date.toLocaleDateString(locale);
}

function scrollToElement(className: string, blink: boolean) {
  console.log("scrolled");
  const el = document.getElementsByClassName(className.toString())[0];

  if (el) {
    el.scrollIntoView();
    console.log("scrolled");
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
    if (!userList.value.has(message?.sender)) {
      const user = (await userStore.getUser({ id: message?.sender })).data;
      userList.value.set(user._id, user);
    }
  }
}

function removeFile() {
  selectedFileUrl.value = "";
}

const resultMention = ref<Array<any>>([]);

watch(messageInput, () => {
  const inputText = messageInput.value;
  if (inputText.endsWith("@")) {
    showModal.value = true;

    const result: Array<any> = [];

    userList.value.forEach((user) => {
      if (result.length < 5) {
        result.push(user);
      }
    });

    resultMention.value = result;
  } else if (inputText.endsWith(" ")) {
    showModal.value = false;
  } else if (!inputText.includes("@")) {
    showModal.value = false;
  } else if (inputText.includes("@")) {
    const inputToCheck = inputText.split("@")[1];
    const result: Array<any> = [];

    userList.value.forEach((user) => {
      const username = user?.username.toUpperCase() + user?.tag.toUpperCase();
      if (username.includes(inputToCheck.toUpperCase())) {
        result.push(user);
      }
    });

    resultMention.value = result;
  }
});

function complete(user: User) {
  messageInput.value = messageInput.value.split("@")[0] + "@" + user.username + user.tag;
}
</script>

<template>
  <div class="relative w-full message_height flex flex-col">
    <div :class="'message-view overflow-y-scroll ' + (selectedFileUrl ? 'message_height_3' : 'message_height_2')">
      <MessageComp
        v-for="(message, index) in messages"
        :key="index"
        v-bind="{
          userName: userList.get(message.sender)?.username || '',
          date: formatDateToFrench(message.date.toString()) || '',
          messageContent: message.content || '',
          file: message.file,
          icon: userList.get(message.sender)?.icon || '',
        }"
        :class="message._id.toString()"
      />
    </div>

    <!--input message-->
    <div class="relative px-4 mt-2">
      <div v-if="selectedFileUrl" class="bg-white-100/10 w-full pl-4">
        <div class="pt-2">
          <div class="w-fit relative bg_custom flex-col justify-center text-white-400 text-center rounded-sm">
            <img :src="selectedFileUrl" alt="Selected Image" class="max-w-[200px] max-h-[200px] border_custom" />
            <p class="">{{ selectedFile.name }}</p>
            <BinIcon class="absolute top-0 right-0" @click="removeFile" />
          </div>
        </div>
      </div>
      <div class="relative mb-[24px] w-full rounded-lg indent-0 bg-white-100/10">
        <div
          class="absolute bottom-14 w-[99%] h-fit z-10 bg-grey-100"
          :class="{ block: showModal, hidden: !showModal }"
        >
          <div class="text-white-400 p-4 hover:bg-grey-500" v-for="user in resultMention" @click="complete(user)">
            {{ user.username + user.tag }}
          </div>
        </div>
        <div class="flex overflow-x-hidden overflow-y-scroll max-h-[50vh] rounded-lg pl-4 items-center">
          <!--upload icon-->
          <div class="h-[44px] w-auto py-[10px] px-[16px] -ml-4">
            <input type="file" id="fileInput" style="display: none" accept="image/*" />

            <div class="group" @click="openFileInput">
              <UploadIcon class="fill-white-300 group-hover:fill-white-400 cursor-pointer" />
            </div>
          </div>

          <!-- input message-->
          <div class="h-fit flex-1 py-[11px] flex items-center w-full">
            <div class="w-full">
              <!-- Input Field -->
              <input
                @keypress.enter="sendMessage"
                v-model="messageInput"
                class="w-full bg-black/0 placeholder:text-white-100/50 outline-none text-white-400"
                type="text"
                placeholder="Envoyer un message"
              />
            </div>
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

.bg_custom {
  background-color: #2b2d31;
}

.border_custom {
  border-width: 8px;
  border-style: solid;
  border-radius: 4px;
  border-color: #2b2d31;
  background-color: #414145;

  padding-left: 5px;
  padding-right: 5px;
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
