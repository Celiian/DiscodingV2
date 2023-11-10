<script setup lang="ts">
import { useUserStore } from "../../store/userstore.js";
import { onClickOutside } from "@vueuse/core";
import { computed, ref, watchEffect } from "vue";
import { useServerStore } from "../../store/serverstore";
import CloseIcon from "../svg/CloseIcon.vue"
import { useRoute, useRouter } from "vue-router";

const router = useRouter()
const routes = useRoute()
const userStore = useUserStore();
const serverStore = useServerStore()
const serverName = ref('')
const inviteId = computed(() => {
  return routes.params.inviteId as string;
});
const target = ref(null);
const currentUserId = computed(() => {
  return userStore.getCurrentUser()._id.toString();
});

watchEffect(async () => {
  const result = await serverStore.getServerByInviteId({ invite_id: inviteId.value });
  console.log(result.data.name),
    serverName.value = result.data.name
});
//METHOD
function closeModal() {
  router.push("/")
}
onClickOutside(target, () => closeModal());

function acceptInvite() {
  serverStore.acceptInvite({ invite_id: inviteId.value, member_id: currentUserId.value })
  closeModal()
}


</script>

<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-grey-100/70 z-10 flex justify-center items-center">
    <div ref="target" class="relative w-[660px] bg-[#1e1f22] rounded flex flex-col items-center p-4">
      <div class="p-4">
        <h2 class="text-white-500 text-2xl font-bold">Voulez vous rejoindre le serveur "{{ serverName }}"</h2>
        <button @click="closeModal" class="absolute top-4 right-4 w-6 h-6">
          <div>
            <CloseIcon class="w-full h-full fill-white-200 hover:fill-white-500 transition-all duration-300" />
          </div>
        </button>
      </div>

      <div class="pt-6 px-6 text-center pb-2 flex w-full gap-10 justify-center">
        <button @click="closeModal"
          class="px-8 py-2 bg-red hover:bg-red/0 hover:text-red rounded text-white-600 text-sm transition-all duration-150 ">
          Refuser
        </button>
        <button @click="acceptInvite"
          class="px-8 py-2 bg-blue-200 hover:bg-blue-100 rounded text-white-600 text-sm transition-all duration-300 ">
          Accepter
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
