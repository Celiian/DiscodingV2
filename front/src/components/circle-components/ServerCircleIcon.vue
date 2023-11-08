<script setup lang="ts">
//import NotificationCircle from "./NotificationCircle.vue";
import { defineProps } from "vue";

const { name, imageUrl, id } = defineProps(["name", "imageUrl", "id"]);
</script>

<template>
  <router-link class="flex w-full justify-center relative mb-2 overflow-x-clip" :to="'/server/' + id">
    <div class="group">
      <img
        :src="imageUrl"
        class="w-[48px] h-[48px] object-cover flex items-center justify-center cursor-pointer rounded-[50%] group-hover:rounded-2xl transition-all duration-300"
      />
      <div class="absolute h-[48px] w-2 top-0 left-0 flex items-center justify-start">
        <div
          class="h-[8px] group-hover:h-[20px] w-full bg-white-600 block rounded-r-[4px] -ml-[4px] transition-all duration-300"
        ></div>
      </div>

      <!-- group-hover:block hidden  -->
      <div class="absolute origin-center top-1 left-full bg-black p-2 text-white-600 z-[10] whitespace-nowrap truncate">
        <div class="bg-black"></div>
        {{ name }}
      </div>

      <!-- <NotificationCircle /> -->
    </div>
  </router-link>
</template>

<style scoped></style>
