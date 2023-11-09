<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import CloseIcon from "../svg/CloseIcon.vue";
import { defineEmits, ref } from "@vue/runtime-core";
import TextualChann from "../svg/TextualChann.vue";
import RadioButton from '../svg/RadioButton.vue'
import VocalChannel from "../svg/VocalChannel.vue";
import { isTextChannel as storeIsTextChannel, channelName as storeChannelName } from "../../store/channelestore";

const emit = defineEmits(["close-modal"]);
const target = ref(null);

function closeModal() {
  emit("close-modal");
}

onClickOutside(target, () => closeModal());

function createChannel() {
  storeIsTextChannel.value = isTextChannel.value;
  storeChannelName.value = storeChannelName.value;
}

const isTextChannel = ref(true);


function onClickText(){
  isTextChannel.value=true
  console.log(isTextChannel.value);
  
}
function onClickVoice(){
  isTextChannel.value=false
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
          <div>
            <div class="salonType">
                <p>TYPE DE SALON</p>
            </div>
            <div class=" clickableDiv flex justify-center items-center" @click="onClickText">
              
                <div class="greyText">
                  <TextualChann />
                </div>
                <div>
                  <div>
                    <div class="salonType">Text</div>
                    <div class="greyText">Partage des images, des GIF, des émojis, des opinions et des blagues</div>
                  </div>
                </div>
                <div>
                    <RadioButton :show="isTextChannel"/>
                </div>
            </div>
          </div>

          <div>
            <div class=" clickableDiv flex justify-center items-center" @click="onClickVoice">
              
                <div class="greyText">
                  <VocalChannel />
                </div>
                <div>
                  <div>
                    <div class="salonType">Voice</div>
                    <div class="greyText">Rejoins tes amis en vocal, en vidéo et avec le partage d'écran</div>
                  </div>
                </div>
                <div>
                    <RadioButton :show="!isTextChannel"/>
                </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p class="salonName">nom du salon</p>
          </div>
          <div class="flex">
            <div class="greyText">
              <TextualChann v-if="isTextChannel" />
              <VocalChannel v-else />
            </div>
            <input type="text" name="salonName" id="">
          </div>

        </div>
      </div>
        <div class="pt-6 px-6 text-center">
          <div class="w-full bg-white-500 flex justify-between p-4 rounded">
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
.clickableDiv {
  cursor: pointer; 
}
.clickableDiv:hover {
  background-color: lightgray;
}

.greyText{
  color:#b1b6bc ;
}
.salonName{
  color: #dcdee1;
}
.salonType{
  color: #dadcdf;
}
</style>
  
