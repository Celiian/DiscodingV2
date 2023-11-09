<script setup lang="ts">
import CloseIcon from "../svg/CloseIcon.vue";
import { useUserStore } from "../../store/userstore.js";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import { useServerStore } from "../../store/serverstore.js";
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue";
import { watch } from "vue";
import { computed } from "@vue/reactivity";

const emit = defineEmits(["close-modal"]);
const userStore = useUserStore();

const uploadedImage = ref("");
const currentUser = userStore.currentUser;
const target = ref(null);


const usernameInput = ref(currentUser.username)
const passwordInput = ref('')
const usernameInputIsDisabled = ref(true)
const passwordInputIsDisabled = ref(true)



//METHOD
function closeModal() {
  emit("close-modal");
}
onClickOutside(target, () => closeModal());



function onClickEditPassword() {
  passwordInputIsDisabled.value = false;
  usernameInputIsDisabled.value = true;

  if (!passwordInputIsDisabled) {
    // faire action ici
  }
}

function onClickEditUsername() {
  usernameInputIsDisabled.value = false;
  passwordInputIsDisabled.value = true;

  if (!usernameInputIsDisabled) {
    // faire action ici
  }
}

function onClickEditImage() {

}


function convertImageToBinary(selectedFile: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryData = event.target?.result;
      resolve(binaryData);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(selectedFile);
  });
}

function openFileInput() {
  const fileInput = document.getElementById("fileInput");
  fileInput?.click();

  fileInput?.addEventListener("change", async (event) => {
    const selectedFile = event.target?.files[0];

    if (selectedFile) {
      try {
        uploadedImage.value = URL.createObjectURL(selectedFile);
      } catch (error) {
        console.error("Error displaying image:", error);
      }
    }
  });
}


</script>

<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-grey-100/70 z-10 flex justify-center items-center">
    <div ref="target" class=" relative w-[660px]  bg-[#1e1f22] rounded flex flex-col">

      <div class="min-h-[100px] bg-blue-200 rounded-t"></div><!--banniere-->

      <div class="h-[72px] w-full flex justify-between pt-4 pr-4 pl-4">
        <div class="flex">
          <div class="w-[100px] rounded-full h-[100px] bg-[#1e1f22] -translate-y-10 translate-x-4 mr-8">
            <RoundedLogoIcon />
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-white-500 text-[20px] leading-[24px] font-semibold mb-[6px]">Titi</div>
            <div title="titi#4545"
              class="cursor-pointer w-[18px] h-[18px] rounded-full bg-green-onlineCircle flex justify-center items-center font-semibold">
              #
            </div>
          </div>
        </div>
        <div>
          <button @click="onClickEditImage"
            class="py-[2px] px-4 min-h-[32px] bg-blue-200 rounded-[3px] leading-4 text-[14px] font-medium flex justify-center items-center text-white-500 hover:text-white-400 hover:bg-blue-100 transition-all duration-300">Modifier
            photo de
            profil</button>
        </div>
      </div>

      <div class="w-full h-full  mt-2 px-4 pb-4">
        <div class="h-full w-full rounded-lg bg-[#2b2d31] flex flex-col p-4">

          <!-- ligne  modifiee-->
          <div class="mb-[24px] w-full flex justify-between">
            <div class="flex flex-col">
              <span class="uppercase text-[12px] leading-4 font-bold tracking-wide text-white-200">nom
                d'utilisateur</span>
              <input
                class="peer rounded px-1 text-[16px] leading-5 font-normal text-white-400 bg-black/0 outline-none disabled:ring-0 ring-1 ring-blue-200"
                v-model="usernameInput" :disabled="usernameInputIsDisabled" />
            </div>

            <button @click="onClickEditUsername" :class="!usernameInputIsDisabled ? 'bg-blue-100' : ''"
              class="py-[2px] px-4 max-h-[32px] min-h-[32px] bg-white-200/50 rounded-[3px] leading-4 text-[14px] font-normal flex justify-center items-center text-white-500 hover:text-white-400 hover:bg-white-300/50 transition-all duration-300">Modifier</button>
          </div>
          <!-- ligne  modifiee-->
          <div class="mb-[24px] w-full flex justify-between">
            <div class="flex flex-col">
              <span class="uppercase text-[12px] leading-4 font-bold tracking-wide text-white-200">mot de passe</span>
              <input type="password"
                class="rounded text-[16px] leading-5 font-normal text-white-400 bg-black/0 outline-none disabled:ring-0 ring-1 ring-blue-200"
                :placeholder="passwordInput" v-model="passwordInput" :disabled="passwordInputIsDisabled" />
            </div>

            <button @click="onClickEditPassword" :class="!passwordInputIsDisabled ? 'bg-blue-100' : ''"
              class="py-[2px] px-4 max-h-[32px] min-h-[32px] bg-white-200/50 rounded-[3px] leading-4 text-[14px] font-normal flex justify-center items-center text-white-500 hover:text-white-400 hover:bg-white-300/50 transition-all duration-300">Modifier</button>
          </div>
          <!-- ligne  modifiee-->
          <div class="w-full flex justify-between">
            <div class="flex flex-col">
              <span class="uppercase text-[12px] leading-4 font-bold tracking-wide text-white-200">email</span>
              <span class="text-[16px] leading-5 font-normal text-white-400 bg-black/0 outline-none">{{ currentUser.email
              }}</span>
            </div>
          </div>




        </div>
      </div>
      <div class="absolute right-4 top-4 cursor-pointer">
        <CloseIcon @click="closeModal" class="fill-white-400" />
      </div>
    </div>




  </div>
</template>

<style scoped></style>
../../store/userStore ../../store/serverStore
