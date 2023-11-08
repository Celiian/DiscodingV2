<script setup lang="ts">
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue";

const props = defineProps({
  userName: String,
  date: String,
  messageContent: String,
});

//METHOD
function onClickUserIconOrName() {
  console.log("clicked onClickUserIconOrName");
}
</script>

<template>
  <li class="relative outline-none px-4 hover:bg-black/10">
    <div class="mt-[1.06rem] min-h-[2.75rem] flex items-center">
      <div @click="onClickUserIconOrName" class="min-w-[40px] min-h-[40px] w-[40px] h-[40px] cursor-pointer">
        <RoundedLogoIcon />
      </div>

      <div class="w-full h-full flex flex-col mx-5">
        <!--message sender-->
        <div class="flex items-center">
          <span @click="onClickUserIconOrName" class="text-white-500 font-semibold cursor-pointer hover:underline">{{
            props.userName }}</span>
          <span class="ml-2 text-[10px] text-white-100 font-semibold"> {{ props.date }}</span>
        </div>

        <!--message content-->
        <div class="w-[95%]">
          <span class="text-white-500 whitespace-break-spaces overflow-x-hidden break-words">{{
            props.messageContent
          }}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped></style>
