<script setup lang="ts">
import { computed } from "vue";
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue";
import { useUserStore } from "../../store/userstore";

const userStore = useUserStore();

const mention_usr = computed(() => {
  if (userStore.getCurrentUser()?.username) {
    return props.messageContent?.includes(userStore.getCurrentUser()!.username + userStore.getCurrentUser()!.tag);
  }
});

const props = defineProps({
  userName: String,
  date: String,
  messageContent: String,
  icon: String,
  file: String,
});
function detectMention(text: string): string | null {
  const mentionRegex = /@[\w#]+/g;
  const match = mentionRegex.exec(text);
  return match ? match[0] : null;
}

const messageContentFormated = computed(() => {
  let message = sanitizeMessageContent(props.messageContent || "");
  const mention = detectMention(message);
  // Replace *italics* or _italics_ with <em>italics</em>
  message = message.replace(/(\*|_)([^*]+)(\*|_)/g, "<em>$2</em>");

  // Replace **bold** with <strong>bold</strong>
  message = message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace ***bold italics*** with <strong><em>bold italics</em></strong>
  message = message.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");

  // Replace __underline__ with <u>underline</u>
  message = message.replace(/__(.*?)__/g, "<u>$1</u>");

  // Replace ~~Strikethrough~~ with <del>Strikethrough</del>
  message = message.replace(/~~(.*?)~~/g, "<del>$1</del>");

  if (mention != null) {
    message = message.replace(
      mention,
      '<span style="background-color: rgba(73, 175, 222, 0.7); border-radius: 5px; padding:4px;">$&</span>'
    );
  }
  return message;
});

//METHOD
function onClickUserIconOrName() {}

function sanitizeMessageContent(message: string) {
  message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return message;
}
</script>

<template>
  <div
    class="w-full h-fit"
    :style="
      mention_usr
        ? 'background-color: #444039; border-left-style: solid; border-color: #e5cb5c; border-left-width:2px'
        : ''
    "
  >
    <div class="w-full h-full">
      <div class="relative outline-none px-4 hover:bg-black/10">
        <div class="mt-[1.06rem] min-h-[2.75rem] flex items-center">
          <div @click="onClickUserIconOrName" class="min-w-[40px] min-h-[40px] w-[40px] h-[40px] cursor-pointer">
            <RoundedLogoIcon :icon="icon" />
          </div>

          <div class="w-full h-full flex flex-col mx-5">
            <!--message sender-->
            <div class="flex items-center">
              <span @click="onClickUserIconOrName" class="text-white-500 font-semibold cursor-pointer hover:underline">
                {{ props.userName }}
              </span>
              <span class="ml-2 text-[10px] text-white-100 font-semibold"> {{ props.date }}</span>
            </div>

            <!--message content-->
            <div v-if="props.file != ''" class="w-[40%]">
              <span class="text-white-500 whitespace-break-spaces overflow-x-hidden break-words">
                <img :src="props.file" />
              </span>
            </div>
            <div class="w-[95%]">
              <span
                :class="['text-white-500', 'whitespace-break-spaces', 'overflow-x-hidden', 'break-words']"
                v-html="messageContentFormated"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
