<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import CloseIcon from "../svg/CloseIcon.vue";
import { defineEmits, ref } from "@vue/runtime-core";
import TextualChann from "../svg/TextualChann.vue";
import VocalChannel from "../svg/VocalChannel.vue";

const emit = defineEmits(["close-modal"]);
const target = ref(null);
const inputChannelName = ref('')

function closeModal() {
  emit("close-modal");
}

onClickOutside(target, () => closeModal());

function createChannel() {
}

const isTextChannel = ref(true);


function onClickText() {
  isTextChannel.value = true
  console.log(isTextChannel.value);

}
function onClickVoice() {
  isTextChannel.value = false
  console.log(isTextChannel.value);

}

</script>


<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-black/70 z-10 flex justify-center items-center">
    <div ref="target" class="bg-grey-400 rounded min-w-[440px] sm:w-[440px] w-full h-full sm:h-auto relative">
      <div class="p-4">
        <h2 class="text-white-500 text-2xl font-bold">Créer un salon</h2>
        <button @click="closeModal" class="absolute top-4 right-4 w-6 h-6">
          <div>
            <CloseIcon class="w-full h-full fill-white-200 hover:fill-black transition-all duration-300" />
          </div>
        </button>
      </div>


      <div class="px-3">
        <div>
          <p class="salonName uppercase text-[14px]">nom du salon</p>
          <div class="flex items-center px-1 rounded m-1 bg-white-300/80">
            <div class="greyText">
              <TextualChann class="text-white-500" />
            </div>
            <input type="text" v-model="inputChannelName"
              class="bg-black/0 w-full overflow-hidden whitespace-nowrap text-ellipsis outline-0 text-white-500">
          </div>
        </div>

        <div>
          <label for="category-select" class="salonName uppercase text-[14px]">Choisir une categorie</label>

          <select name="pets" id="category-select" v-for="(category, index) in categories">
            <option :value="category._id">{{ category.name }}</option>
          </select>
        </div>


      </div>
      <div class="pt-6 px-6 text-center">
        <div class="w-full bg-white-500 flex justify-between p-4 rounded">
          <button @click="createChannel"
            class="px-8 py-2 bg-blue-200 hover:bg-blue-100 rounded text-white-600 text-sm transition-all duration-300">
            Créer
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
  
