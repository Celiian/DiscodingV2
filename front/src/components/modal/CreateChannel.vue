<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import CloseIcon from "../svg/CloseIcon.vue";
import { computed, defineEmits, ref } from "@vue/runtime-core";
import TextualChann from "../svg/TextualChann.vue";
import { useServerStore } from '../../store/serverstore';
import { watchEffect } from "vue";
import { useRoute } from 'vue-router';

const serverStore = useServerStore()
const emit = defineEmits(["close-modal"]);
const target = ref(null);
const inputChannelName = ref('')
const categorySelectedId = ref('')
const channels = ref<Array<any>>()
const categories = ref<Array<any>>()
const routes = useRoute();
const serverId = computed(() => {
  return routes.params.serverId as string;
});

const isButtonDisabled = computed(() => {
  return inputChannelName.value === ''
})
watchEffect(async () => {
  const result = await serverStore.getChannelsServer(serverId.value)

  channels.value = result.channels
  categories.value = result.categories

})

function closeModal() {
  emit("close-modal");
}

onClickOutside(target, () => closeModal());

function createChannel() {
  if (inputChannelName.value !== "") {
    if (categorySelectedId.value) {
      serverStore.createChannel({
        name: inputChannelName.value,
        audio: false,
        source: categorySelectedId.value
      })
    } else {
      serverStore.createChannel({
        name: inputChannelName.value,
        audio: false,
        source: serverId.value
      })
    }
    closeModal()
  }


}


</script>


<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-black/70 z-30 flex justify-center items-center">
    <div ref="target" class="bg-grey-400 rounded min-w-[440px] sm:w-[440px] w-full h-full sm:h-auto relative p-4">
      <div class="p-4">
        <h2 class="text-white-500 text-2xl font-bold">Créer un salon</h2>
        <button @click="closeModal" class="absolute top-4 right-4 w-6 h-6">
          <div>
            <CloseIcon class="w-full h-full fill-white-200 hover:fill-white-500 transition-all duration-300" />
          </div>
        </button>
      </div>


      <div class="px-3">
        <div class="mb-10">
          <p class="salonName uppercase text-[14px]">nom du salon</p>
          <div class="flex items-center px-1 rounded m-1 bg-white-300/80">
            <div class="greyText">
              <TextualChann class="text-white-500" />
            </div>
            <input required type="text" v-model="inputChannelName" placeholder="Nom du salon"
              class="placeholder:text-black bg-black/0 w-full overflow-hidden whitespace-nowrap text-ellipsis outline-0 text-white-500">
          </div>
        </div>

        <div class="flex flex-col">
          <label for="category-select" class="salonName uppercase text-[14px]">Choisir une categorie <span
              class="normal-case">(optionnel)</span></label>

          <select class="bg-white-300/80 outline-none rounded mx-1" v-model="categorySelectedId" name="categories"
            id="category-select">
            <option value="">Selectionner une catégorie</option>
            <option v-for="category in categories" :value="category._id">{{ category.name }}</option>

          </select>
        </div>


      </div>
      <div class="pt-6 px-6 text-center">
        <button :disabled="isButtonDisabled" @click="createChannel"
          class="px-8 py-2 bg-blue-200 hover:bg-blue-100 rounded text-white-600 text-sm transition-all duration-300 disabled:bg-white-300/80">
          Créer
        </button>

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
  
