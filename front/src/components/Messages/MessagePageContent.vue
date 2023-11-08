<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import UploadIcon from "../svg/UploadIcon.vue";
import MessageComp from "./MessageComp.vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { emitEvent } from "../../utils/ws";
import { useMessageStore } from "../../store/messagestore";
import { useUserStore } from "../../store/userstore";

const userStore = useUserStore();
const messageStore = useMessageStore();
const messageInput = ref("");
const routes = useRoute();

export interface Message {
  channel: string;
  sender: string;
  content: string;
  date: Date;
}

const messages = computed<Message[]>(() => {
  return messageStore.getMessages();
});

const friend = ref();

const channelId = computed(() => {
  return routes.params.channelId as string;
});

watchEffect(async () => {
  friend.value = (await userStore.getUser({ id: routes.params.friendId as string })).data;
  emitEvent({ event: "mp-join", data: { channel: channelId.value } });
  await messageStore.getMessagesMp(channelId.value);
  console.log(messages);
});

onBeforeRouteLeave(() => {
  emitEvent({ event: "mp-leave", data: { channel: channelId.value } });
});

//METHOD
function onClickUploadButton() {
  console.log("upload button click");
}

function sendMessage() {
  messageStore.mp({
    sender: userStore.getCurrentUser()._id.toString(),
    content: messageInput.value,
    channel: channelId.value,
  });
  messageInput.value = "";
}
</script>

<template>
  <div class="w-full h-full flex flex-col max-h-[95%]">
    <div class="overflow-y-scroll h-full flex-col">
      <!--message list content-->
      <MessageComp
        v-for="message in messages"
        v-bind="{
          userName: message.sender == friend._id ? friend.username : userStore.getCurrentUser().username,
          date: 'Aujourd\'hui à 22:20',
          messageContent: message.content,
        }"
      />
    </div>

    <!--input message-->
    <div class="relative shrink-0 px-4 mt-2">
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
::-webkit-scrollbar {
  width: 0;
}
</style>
