<script setup lang="ts">
import FriendIcon from "../svg/FriendIcon.vue";
import PlusMessageIcon from "../svg/PlusMessageIcon.vue";
</script>

<template>
  <div class="w-[240px] h-full bg-grey-300 flex flex-col grow-0 shrink-0 basis-auto">
    <nav class="flex flex-col flex-1">
      <div class="flex grow-0 shrink-0 basis-auto px-2 h-12 items-center shadow-customOne">
        <div
          class="w-full h-7 bg-grey-100 rounded text-sm overflow-hidden whitespace-nowrap leading-7 text-ellipsis text-white-100 px-2"
        >
          Rechercher/lancer une conversation
        </div>
      </div>

      <div class="flex-col grow-1 shrink-1 basis-auto w-full h-full">
        <div
          class="flex text-white-300 h-[5%] items-center justify-around hover:text-white-500 hover:bg-grey-500 w-[92%] ml-[4%] mt-2 rounded-sm"
        >
          <FriendIcon class="w-1/5" />

          <div class="w-[70%]">Amis</div>
        </div>

        <div class="flex text-white-300 justify-between pe-4 px-4 items-center hover:text-white-500 mt-[7%]">
          <p class="text-xs font-medium">MESSAGES PRIVÉS</p>
          <div class="w-4">
            <div class="group flex relative">
              <PlusMessageIcon class="w-full text-white-300" />
              <span
                class="text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 -translate-y-14 opacity-0 m-4 mx-auto group-hover:opacity-100 whitespace-nowrap z-10 bg-black p-[6px]"
                >Create DM</span
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="w-full h-[52px] min-h-[52px] bg-grey-200 flex grow-0 shrink-0 basis-auto"></div>
  </div>
</template>

<style scoped></style>
