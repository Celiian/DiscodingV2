<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import CloseIcon from "../svg/CloseIcon.vue";
import { computed, defineEmits, ref } from "@vue/runtime-core";
import { useRoute } from 'vue-router';
import { useServerStore } from "../../store/serverstore";

const emit = defineEmits(["close-modal"]);
const target = ref(null);

const serverStore = useServerStore()
const routes = useRoute()
const categoryInput = ref('')

const serverId = computed(() => {
  return routes.params.serverId as string;
});

const isButtonDisabled = computed(() => {
  return categoryInput.value === ''
})

function closeModal() {
  emit("close-modal");
}

onClickOutside(target, () => closeModal());

function createCategory() {
  if (categoryInput.value !== '') {
    serverStore.createCategory({ name: categoryInput.value, server: serverId.value })
    closeModal()
  }
}

</script>


<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-black/70 z-30 flex justify-center items-center">
    <div ref="target" class="bg-grey-400 rounded min-w-[440px] sm:w-[440px] w-full h-full sm:h-auto relative p-4">
      <div class="p-4">
        <h2 class="text-white-500 text-2xl font-bold">Créer une catégorie</h2>
        <button @click="closeModal" class="absolute top-4 right-4 w-6 h-6">
          <div>
            <CloseIcon class="w-full h-full fill-white-200 hover:fill-white-500 transition-all duration-300" />
          </div>
        </button>
      </div>
      <div class="text-white-300">
        <span class="salonName uppercase text-[14px]">Nom de la catégorie</span>
      </div>
      <div>
        <input type="text" v-model="categoryInput" required
          class="placeholder:text-black px-2 rounded bg-white-300/80 w-full overflow-hidden whitespace-nowrap text-ellipsis outline-0 text-white-500">
      </div>

      <div class="pt-6 px-6 text-center">
        <button :disabled="isButtonDisabled" @click="createCategory"
          class="px-8 py-2 bg-blue-200 hover:bg-blue-100 rounded text-white-600 text-sm transition-all duration-300 disabled:bg-white-300/80">
          Créer
        </button>
      </div>
    </div>
  </div>
</template>
  
<style scoped></style>

  
