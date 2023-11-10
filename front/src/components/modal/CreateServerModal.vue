<script setup lang="ts">
import CloseIcon from "../svg/CloseIcon.vue";
import AddPhotoIcon from "../svg/AddPhotoIcon.vue";
import { useUserStore } from "../../store/userstore";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import { useServerStore } from "../../store/serverstore";
import { uploadImage } from "../../store/utils/imageupload";

const emit = defineEmits(["close-modal"]);
const userStore = useUserStore();
const serverStore = useServerStore();

const currentUser = userStore.currentUser;
const serverName = ref("");
const target = ref(null);

const selectedFile = ref();
const selectedFileUrl = ref("");

//METHOD

function closeModal() {
  emit("close-modal");
}
onClickOutside(target, () => closeModal());

function openFileInput() {
  const fileInput = document.getElementById("fileInput");
  fileInput?.click();

  fileInput?.addEventListener("change", async (event) => {
    selectedFile.value = (event.target as HTMLInputElement).files;
    selectedFileUrl.value = URL.createObjectURL(selectedFile.value[0]);
  });
}

async function createServer() {
  if (!selectedFile.value) {
    console.error("No file uploaded");
    return;
  }

  if (!serverName.value) {
    console.error("Server name is empty");
    return;
  }

  try {
    const res = await uploadImage(selectedFile.value);

    serverStore.createServer({ serverName: serverName.value, icon: res[0].url });
  } catch (error) {
    console.error("Error creating server:", error);
  }
}
</script>

<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-black/70 z-10 flex justify-center items-center">
    <div ref="target" class="bg-white-600 rounded min-w-[440px] sm:w-[440px] w-full h-full sm:h-auto relative">
      <button @click="closeModal" class="absolute top-4 right-4 w-6 h-6">
        <CloseIcon class="w-full h-full fill-white-200 hover:fill-black transition-all duration-300" />
      </button>

      <div class="pt-6 px-6 text-center">
        <h2 class="text-black text-2xl font-bold">Personnalise ton serveur</h2>
        <p class="text-base mt-2">
          Donne une personnalité à ton nouveau serveur en choisissant un nom et une icône. Tu pourras toujours les
          modifier plus tard.
        </p>

        <div class="flex justify-center pt-1">
          <input type="file" id="fileInput" style="display: none" accept="image/*" />
          <button v-if="selectedFileUrl == ''" @click="openFileInput">
            <AddPhotoIcon />
          </button>
          <div
            v-else
            :style="{ backgroundImage: 'url(' + selectedFileUrl + ')' }"
            class="w-[80px] h-[80px] flex items-center justify-center cursor-pointer rounded-[50%] group-hover:rounded-2xl transition-all duration-300 overflow-hidden bg-cover bg-center"
            @click="openFileInput"
          ></div>
        </div>

        <div class="w-full flex flex-col mt-6">
          <h3 class="mb-2 text-xs font-bold text-grey-500">NOM DU SERVEUR</h3>
          <input
            type="text"
            :placeholder="'Serveur de ' + currentUser.username"
            class="w-full h-[40px] bg-white-500 rounded p-[10px] placeholder:text-grey-300 focus:outline-0"
            v-model="serverName"
          />
          <p class="mt-2 pb-1 text-[#5c5e66] text-xs font-normal">
            En créant un serveur, tu acceptes la
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="font-semibold text-[#00a8fc]"
              >Charte d'Utilisation de mon c*l de Discord</a
            >.
          </p>
        </div>
      </div>

      <div class="w-full bg-white-500 flex justify-between p-4 rounded">
        <button class="text-sm text-black px-[2px] py-1">Retour</button>
        <button
          @click="createServer"
          class="px-8 py-2 bg-blue-200 hover:bg-blue-100 rounded text-white-600 text-sm transition-all duration-300"
        >
          Créer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
