<script setup lang="ts">
import { ref } from "vue";
import MainContent from "../home/MainContent.vue";

import FriendsHeader from "./FriendsHeader.vue";
import FriendsPageContent from "./FriendsPageContent.vue";

const isAddFriendsPageShown = ref<boolean>();

function showAddOrListFriendPage(val: boolean) {
  isAddFriendsPageShown.value = val;
}
</script>

<template>
  <MainContent>
    <template v-slot:header> <FriendsHeader @show-add-or-list-friend-page="showAddOrListFriendPage" /></template>
    <template v-slot:content> <FriendsPageContent :isAddFriendsPageShown="isAddFriendsPageShown" /></template>
  </MainContent>
</template>
<style scoped></style>
