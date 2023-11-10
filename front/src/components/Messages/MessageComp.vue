<script setup lang="ts">
import { computed } from "vue";
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue";

const props = defineProps({
  userName: String,
  date: String,
  messageContent: String,
  icon: String,
});

const messageContentFormated = computed(() => {
  // Replace *italics* or _italics_ with <em>italics</em>
  let message = props.messageContent?.replace(/(\*|_)([^*]+)(\*|_)/g, "<em>$2</em>") || "";

  // Replace **bold** with <strong>bold</strong>
  message = message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace ***bold italics*** with <strong><em>bold italics</em></strong>
  message = message.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");

  // Replace __underline__ with <u>underline</u>
  message = message.replace(/__(.*?)__/g, "<u>$1</u>");

  // Replace ~~Strikethrough~~ with <del>Strikethrough</del>
  message = message.replace(/~~(.*?)~~/g, "<del>$1</del>");

  return message;
});
//METHOD
function onClickUserIconOrName() {}
</script>

<template>
  <div class="w-full h-fit">
    <div class="w-full h-full">
      <div class="relative outline-none px-4 hover:bg-black/10">
        <div class="mt-[1.06rem] min-h-[2.75rem] flex items-center">
          <div @click="onClickUserIconOrName" class="min-w-[40px] min-h-[40px] w-[40px] h-[40px] cursor-pointer">
            <RoundedLogoIcon :icon="icon" />
          </div>

          <div class="w-full h-full flex flex-col mx-5">
            <!--message sender-->
            <div class="flex items-center">
              <span
                @click="onClickUserIconOrName"
                class="text-white-500 font-semibold cursor-pointer hover:underline"
                >{{ props.userName }}</span
              >
              <span class="ml-2 text-[10px] text-white-100 font-semibold"> {{ props.date }}</span>
            </div>

            <!--message content-->
            <div class="w-[95%]">
              <span
                class="text-white-500 whitespace-break-spaces overflow-x-hidden break-words"
                v-html="messageContentFormated"
              >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
