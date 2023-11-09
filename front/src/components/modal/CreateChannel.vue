
<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import CloseIcon from "../svg/CloseIcon.vue";
import { defineEmits, ref } from "@vue/runtime-core";

const emit = defineEmits(["close-modal"]);
const target = ref(null);

function closeModal() {
  emit("close-modal");
}

onClickOutside(target, () => closeModal());

function createChannel() {
  // Ajoute ici la logique pour créer un canal
  // Par exemple, tu peux appeler une fonction depuis ton store
  // ou émettre un événement pour que le composant parent traite la création du canal.
}
</script>


<template>
 <div class="absolute top-0 left-0 w-screen h-screen bg-black/70 z-10 flex justify-center items-center">
    <div ref="target" class="bg-white-600 rounded min-w-[440px] sm:w-[440px] w-full h-full sm:h-auto relative">
      <button @click="closeModal" class="absolute top-4 right-4 w-6 h-6">
        <CloseIcon class="w-full h-full fill-white-200 hover:fill-black transition-all duration-300" />
      </button>
  
        <div class="pt-6 px-6 text-center">
          <h2 class="text-black text-2xl font-bold">Créer un canal</h2>

  
          <div class="w-full bg-white-500 flex justify-between p-4 rounded">
            <button class="text-sm text-black px-[2px] py-1" @click="closeModal">Annuler</button>
            <button
              @click="createChannel"
              class="px-8 py-2 bg-blue-200 hover:bg-blue-100 rounded text-white-600 text-sm transition-all duration-300"
            >
              Créer
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  

  
  <style scoped>
    /* Ajoute ici les styles spécifiques pour CreateChannel.vue */
  </style>
  