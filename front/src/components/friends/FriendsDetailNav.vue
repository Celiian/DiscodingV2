<script setup lang="ts">
import FriendIcon from "../svg/FriendIcon.vue";
import PlusMessageIcon from "../svg/PlusMessageIcon.vue";
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue";
import CloseIcon from "../svg/CloseIcon.vue";
import FriendListCard from "../Messages/FriendListCard.vue";
</script>

<template>
  <router-link
    to="/me/friends"
    class="flex text-white-300 h-[5%] items-center justify-around hover:text-white-500 hover:bg-grey-500 w-[92%] ml-[4%] mt-2 rounded-sm"
  >
    <FriendIcon class="w-1/5" />

    <div class="w-[70%]">Amis</div>
  </router-link>

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

  <div class="w-full h-[1200px] overflow-y-hidden mt-1">
    <ul>
      <!--friend card list-->
      <FriendListCard/>

    </ul>

  </div>
</template>

<style scoped>

::-webkit-scrollbar{
  width: 0;
}
</style>

