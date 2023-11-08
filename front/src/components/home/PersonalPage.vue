<script setup lang="ts">
import DetailNav from "../home/DetailNav.vue";

import FriendsDetailNav from "../friends/FriendsDetailNav.vue";
</script>
<template>
  <DetailNav>
    <template v-slot:header>
      <div
        class=" fixed w-[220px] h-7 bg-grey-100 rounded text-sm overflow-hidden whitespace-nowrap leading-7 text-ellipsis text-white-100 px-2"
      >
        Rechercher/lancer une conversation
      </div>
    </template>

    <template v-slot:content><FriendsDetailNav /> </template>
  </DetailNav>

  <router-view></router-view>
</template>
<style scoped></style>
