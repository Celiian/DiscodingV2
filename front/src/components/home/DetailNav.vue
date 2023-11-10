<script setup lang="ts">
import SettingIcon from "../svg/SettingIcon.vue";
import { useUserStore } from "../../store/userstore";
import ProfilSettingModal from "../modal/ProfilSettingModal.vue";
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import RoundedLogoIcon from '../circle-components/RoundedLogoIcon.vue';



const userStore = useUserStore();
const currentUser = computed(() => {
  return userStore.getCurrentUser();
});

const settingModalOpenend = ref(false);

//METHOD
function closeSettingModal() {
  settingModalOpenend.value = false;
}

function openSettingModal() {
  settingModalOpenend.value = true;
}
</script>

<template>
  <div
    class="main -mt-0 w-[240px] h-full bg-grey-300 flex flex-col grow-0 shrink-0 basis-auto overflow-y-scroll overflow-x-hidden relative ">
    <nav class="flex flex-col flex-1 ">
      <div
        class="z-50 flex grow-0 shrink-0 basis-auto px-2 h-12 items-center shadow-customOne fixed bg-grey-300 w-[240px]">
        <slot name="header">
        </slot>
      </div>

      <div class="flex-col grow-1 shrink-1 basis-auto w-full h-full mt-[48px]">
        <slot name="content">
        </slot>
      </div>
    </nav>

    <div
      class="h-[52px] min-h-[52px] bg-grey-200 flex grow-0 shrink-0 basis-auto w-[240px] fixed bottom-0 px-2 items-center font-medium text-[14px] justify-between">
      <div class="group flex items-center -ml-[2px] min-w-[120px] pl-[2px] mr-2 h-[80%] hover:bg-white-100/20 rounded">
        <div class="w-8 h-8">
          <RoundedLogoIcon :icon="currentUser?.icon" />
        </div>

        <div class="py-1 pl-2 flex flex-col mr-1 h-full items-start justify-start">
          <div class="text-white-300 text-[13px] font-medium">{{ currentUser?.username }}</div>
          <div class="relative text-white-200 text-[12px] whitespace-nowrap">
            <span
              class="absolute -top-1 group-hover:opacity-0 opacity-100 translate-y-0 group-hover:-translate-y-3 transition-all duration-150">
              En ligne
            </span>
            <span
              class="absolute -top-1 opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-150">
              {{ currentUser?.username }}{{ currentUser?.tag }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-end pr-2">
        <div @click="openSettingModal"
          class="p-1 rounded hover:bg-white-200/50 transition-all duration-150 cursor-pointer">
          <SettingIcon class="fill-white-300" />
        </div>
      </div>
    </div>
  </div>

  <ProfilSettingModal v-if="settingModalOpenend" @close-modal="closeSettingModal" />
</template>

<style scoped>
::-webkit-scrollbar {
  display: block;
  opacity: 0;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}

.main:hover::-webkit-scrollbar-thumb {
  background: #1e1f22;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1e1f2200;
  border-radius: 20px;
}

.channel {
  position: relative;
  display: flex;
  align-items: center;
  color: #8e959e;
}

.channelSvg {
  margin-right: 6px;
}
</style>
