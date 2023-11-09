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

function closeModal() {
  emit("close-modal");
}

onClickOutside(target, () => closeModal());

function createCategory() {

  console.log('server id :', serverId.value)
  console.log('input :', categoryInput.value)
  serverStore.createCategory({ name: categoryInput.value, server: serverId.value })

  // storeIsTextChannel.value = isTextChannel.value;
  // storeChannelName.value = storeChannelName.value;
}

const isTextChannel = ref(true);
</script>


<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-black/70 z-10 flex justify-center items-center">
    <div ref="target" class="bg-grey-400 rounded min-w-[440px] sm:w-[440px] w-full h-full sm:h-auto relative">
      <div class="p-4">
        <h2 class="text-white-500 text-2xl font-bold">Créer une catégorie</h2>
        <button @click="closeModal" class="absolute top-4 right-4 w-6 h-6">
          <div>
            <CloseIcon class="w-full h-full fill-white-200 hover:fill-black transition-all duration-300" />
          </div>
        </button>
      </div>
      <div class="text-white-300">
        <span>Nom de la catégorie</span>
      </div>
      <div>
        <input type="text" v-model="categoryInput">
      </div>
      <button class="text-grey-400 bg-white-500" @click="createCategory">
        Créer
      </button>
    </div>
  </div>
</template>
  
<style scoped></style>

  
