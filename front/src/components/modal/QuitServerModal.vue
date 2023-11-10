<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import CloseIcon from "../svg/CloseIcon.vue";
import { computed, defineEmits, ref } from "@vue/runtime-core";
import { useServerStore } from "../../store/serverstore";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../store/userstore";

const userStore = useUserStore();
const serverStore = useServerStore();
const emit = defineEmits(["close-modal"]);
const target = ref(null);
const routes = useRoute();
const inputValidation = ref(false);
const serverId = computed(() => {
  return routes.params.serverId as string;
});
const currentServerName = ref();
const currentServerId = ref();
const currentUserId = computed(() => {
  return userStore.getCurrentUser()!._id.toString();
});

const isButtonDisabled = computed(() => {
  return inputValidation.value;
});
watchEffect(async () => {
  const result = await serverStore.getServerById({ id: serverId.value });

  currentServerName.value = result.name;
  currentServerId.value = result._id;
});

function closeModal() {
  emit("close-modal");
}

onClickOutside(target, () => closeModal());

function onCLickInfiniteCheckbox() {
  inputValidation.value = !inputValidation.value;
}

function quitServer() {
  if (inputValidation) {
    serverStore.leaveServer({ member_id: currentUserId.value, server_id: currentServerId.value });
  }

  closeModal();
}
</script>

<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-black/70 z-30 flex justify-center items-center">
    <div ref="target" class="bg-grey-400 rounded min-w-[440px] sm:w-[440px] w-full h-full sm:h-auto relative p-4">
      <div class="p-4">
        <h2 class="text-white-500 text-2xl font-bold text-center">
          Voulez-vous réellement quitter le serveur : " {{ currentServerName }} "
        </h2>
        <button @click="closeModal" class="absolute top-4 right-4 w-6 h-6">
          <div>
            <CloseIcon class="w-full h-full fill-white-200 hover:fill-white-500 transition-all duration-300" />
          </div>
        </button>
      </div>

      <div class="flex flex-col">
        <div class="w-full flex justify-center">
          <input @click="onCLickInfiniteCheckbox" id="infini" type="checkbox" class="mr-2" />
          <label class="text-white-400" for="infini">Oui ce serveur était vraiment nul !</label>
        </div>

        <div class="pt-6 px-6 text-center">
          <button
            :disabled="!isButtonDisabled"
            @click="quitServer"
            class="px-8 py-2 bg-blue-200 hover:bg-blue-100 rounded text-white-600 text-sm transition-all duration-300 disabled:bg-white-300/80"
          >
            Quitter le serveur
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clickableDiv {
  cursor: pointer;
}

.clickableDiv:hover {
  background-color: lightgray;
}

.greyText {
  color: #b1b6bc;
}

.salonName {
  color: #dcdee1;
}

.salonType {
  color: #dadcdf;
}
</style>
