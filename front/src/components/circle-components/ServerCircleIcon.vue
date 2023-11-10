<script setup lang="ts">
import NotificationCircle from "./NotificationCircle.vue";
import { defineProps } from "vue";

const { name, imageUrl, link, notif, count, notif_small } = defineProps([
  "name",
  "imageUrl",
  "link",
  "notif",
  "count",
  "notif_small",
]);
</script>

<template>
  <router-link class="flex w-full justify-center relative mb-2 overflow-x-clip" :to="link">
    <div class="group">
      <img :src="imageUrl"
        class="w-[48px] h-[48px] flex items-center justify-center cursor-pointer rounded-[50%] group-hover:rounded-2xl transition-all duration-300 object-cover" />

      <div v-if="true" class="absolute h-[48px] w-2 top-0 left-0 flex items-center justify-start">
        <div
          class="h-[8px] group-hover:h-[20px] w-full bg-white-600 block rounded-r-[4px] -ml-[4px] transition-all duration-300">
        </div>
      </div>


      <!-- red notification circle-->
      <div class="absolute -bottom-1 right-2">
        <NotificationCircle v-if="notif && count > 0" :number="count" />
      </div>

    </div>
  </router-link>
</template>

<style scoped></style>
