<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import CloseIcon from "../svg/CloseIcon.vue";
import CopyIcon from "../svg/CopyIcon.vue";
import { computed, defineEmits, ref } from "@vue/runtime-core";
import { useServerStore } from "../../store/serverstore";
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../store/userstore";

const userStore = useUserStore();
const serverStore = useServerStore();
const emit = defineEmits(["close-modal"]);
const target = ref(null);
const inputPeopleNumber = ref(10);
const infiniteCheckboxValue = ref(false);
const todayDate = format(new Date());
const dateInput = ref(todayDate);
const routes = useRoute();
const inviteCreationDone = ref(false)
const inviteLinkText = ref('')
const isTextCopied = ref(false)
const serverId = computed(() => {
  return routes.params.serverId as string;
});
const currentServerName = ref();
const currentServerId = ref();
const currentUserId = computed(() => {
  return userStore.getCurrentUser()._id.toString();
});

watchEffect(async () => {
  const result = await serverStore.getServerById({ id: serverId.value });
  currentServerName.value = result.name;
  currentServerId.value = result._id;
});

function format(date: Date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid "date" argument. You must pass a date instance');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function closeModal() {
  emit("close-modal");
}

onClickOutside(target, () => closeModal());


async function createInvite() {
  if (dateInput.value) {
    const invitDate = new Date(dateInput.value);
    const limitNumber = inputPeopleNumber.value <= 0 || infiniteCheckboxValue.value ? -1 : inputPeopleNumber.value;

    try {
      const resp = await serverStore.createInvite({
        server_id: currentServerId.value,
        expiration: invitDate,
        limit: limitNumber,
        creator: currentUserId.value,
      });
      if (resp.success) {
        inviteLinkText.value = resp.data.data.data.insertedId
        inviteCreationDone.value = true
      }


    } catch (error) {
      console.error("Erreur lors de la création de l'invitation : ", error);
    }
  }
}

function onCLickInfiniteCheckbox() {
  infiniteCheckboxValue.value = !infiniteCheckboxValue.value;
}

async function copyToClipboard() {
  const inviteLink = document.querySelector('.inviteLink')!.innerHTML;


  try {
    await navigator.clipboard.writeText(inviteLink)
    isTextCopied.value = true

  } catch (err) {
    console.error("La copie n'a pas fonctionné : ", err)
  }
}


</script>

<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-black/70 z-10 flex justify-center items-center">
    <div v-if="!inviteCreationDone" ref="target"
      class="bg-grey-400 rounded min-w-[440px] sm:w-[440px] w-full h-full sm:h-auto relative p-4">
      <div class="p-4">
        <h2 class="text-white-500 text-2xl font-bold">Créer une invitation pour "{{ currentServerName }}"</h2>
        <button @click="closeModal" class="absolute top-4 right-4 w-6 h-6">
          <div>
            <CloseIcon class="w-full h-full fill-white-200 hover:fill-white-500 transition-all duration-300" />
          </div>
        </button>
      </div>

      <div class="px-3">
        <div class="mb-10">
          <p class="salonName uppercase text-[14px]">personne qui pourront accepter :</p>
          <div class="flex gap-10 justify-start items-center">
            <div class="flex items-center w-1/5 px-1 rounded m-1 bg-white-300/80">
              <input :disabled="infiniteCheckboxValue" type="number" v-model="inputPeopleNumber" placeholder="10" min="1"
                max="99"
                class="placeholder:text-black bg-black/0 w-full overflow-hidden whitespace-nowrap text-ellipsis outline-0 text-white-500 disabled:text-white-500/40 disabled:cursor-not-allowed" />
            </div>
            <div>
              <input @click="onCLickInfiniteCheckbox" id="infini" type="checkbox" class="mr-2" />
              <label class="text-white-400" for="infini">Je ne souhaite pas de limite</label>
            </div>
          </div>
        </div>
        <div class="mb-10">
          <p class="salonName uppercase text-[14px]">Date d'expiration de l'invitation :</p>
          <div class="flex gap-10 justify-start items-center">
            <div class="flex items-center w-2/5 px-1 rounded m-1 bg-white-300/80">
              <input required type="date" v-model="dateInput" :min="todayDate"
                class="placeholder:text-black bg-black/0 w-full overflow-hidden whitespace-nowrap text-ellipsis outline-0 text-white-500" />
            </div>
          </div>
        </div>
      </div>
      <div class="pt-6 px-6 text-center">
        <button @click="createInvite"
          class="px-8 py-2 bg-blue-200 hover:bg-blue-100 rounded text-white-600 text-sm transition-all duration-300 disabled:bg-white-300/80">
          Créer
        </button>
      </div>
    </div>



    <div v-if="inviteCreationDone" ref="target"
      class="bg-grey-400 rounded min-w-[440px] sm:w-auto w-full h-full sm:h-auto relative p-4 flex flex-col justify-center items-center gap-4">
      <h1 class="salonName uppercase text-[14px]">Lien d'invitation : </h1>
      <div class="flex justify-between items-center gap-4">
        <h1 class="inviteLink p-2 rounded bg-white-400/50">http://localhost:5173/accept/{{ inviteLinkText }}</h1>
        <div @click="copyToClipboard"
          class="w-5 h-5 fill-white-400/50 cursor-pointer hover:fill-white-400/90 duration-150 transition-all">
          <CopyIcon />
        </div>
      </div>

      <div v-if="isTextCopied">
        <h2 class="text-[12px] text-green-onlineCircle">Lien d'invitation copié !</h2>
        <div class="pt-6 px-6 text-center">
          <button @click="closeModal"
            class="px-8 py-2 bg-blue-200 hover:bg-blue-100 rounded text-white-600 text-sm transition-all duration-300 ">
            Quitter
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
