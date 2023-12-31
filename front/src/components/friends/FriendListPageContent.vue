<script setup lang="ts">
//METHOD

import { ref } from "vue";
import CloseIcon from "../svg/CloseIcon.vue";
import SearchIcon from "../svg/SearchIcon.vue";
import IllustrationNoFriendContent from "../svg/IllustrationNoFriendContent.vue";
import { computed } from "@vue/reactivity";
import UserCardList from "./UserCardList.vue";
import { useFriendsStore } from "../../store/friendsstore";

const friendsStore = useFriendsStore();
const input = ref("");
const searchIconClass = computed(() => ({
  "opacity-0": input.value.length !== 0,
  "opacity-100": input.value.length === 0,
}));
const closeIconClass = computed(() => ({
  "opacity-100 rotate-0": input.value.length !== 0,
  "opacity-0": input.value.length === 0,
}));

const filteredTitle = ["En ligne", "Tous les amis", "En attente", "Bloqués"];
const wumpusSentence = [
  "Le Wumpus est toujours en ligne!",
  "Le Wumpus sera toujours ton ami",
  "Personne attends le Wumpus",
  "Tu ne peux pas bloquer le Wumpus woula.",
];

const friendList = computed(() => {
  switch (friendsStore.getDisplayed()) {
    case 0:
      return friendsStore.getFriendsOnline();
    case 1:
      return friendsStore.getFriendsOnline();
    case 2:
      return friendsStore.getPending();
    case 3:
    default:
      return [];
  }
});
</script>

<template>
  <div v-if="friendList.length === 0" class="w-full h-full flex flex-col justify-center items-center">
    <IllustrationNoFriendContent />
    <span class="text-[16px] leading-5 text-center text-white-100">{{
      wumpusSentence[friendsStore.getDisplayed()]
    }}</span>
  </div>

  <!-- search bar-->
  <div v-else class="mt-4 mr-5 mb-2 ml-[30px] bg-grey-100 overflow-hidden rounded box-border flex">
    <div class="relative flex shrink grow basis-auto flex-wrap p-[1px] items-center min-w-0">
      <input
        type="text"
        v-model="input"
        placeholder="Rechercher"
        class="h-[30px] text-[16px] leading-8 px-2 flex-1 min-w-[48px] m-[1px] bg-black/0 box-border resize-none border-none outline-none placeholder:text-white-200 text-white-400 font-normal placeholder:font-normal"
      />

      <div class="h-8 w-8 box-border flex justify-center items-center cursor-text">
        <div class="w-5 h-5 relative">
          <SearchIcon
            :class="searchIconClass"
            class="w-full h-full fill-white-300 absolute top-0 left-0 transition-all duration-300"
          />
          <CloseIcon
            :class="closeIconClass"
            class="w-full h-full fill-white-300 absolute top-0 left-0 rotate-90 duration-300 transition-all"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- filter title-->
  <div v-else class="flex items-center justify-between">
    <h2
      class="mt-4 mr-5 mb-2 ml-[30px] box-border text-ellipsis whitespace-nowrap overflow-hidden uppercase text-[11px] leading-4 tracking-[0.02em] grow shrink basis-auto font-bold text-white-300"
    >
      {{ filteredTitle[friendsStore.getDisplayed()] }} - {{ friendList.length }}
    </h2>
  </div>

  <!-- friend list-->
  <div class="overflow-x-hidden overflow-y-scroll pr-0 pb-2 mt-2 relative box-border min-h-0 grow shrink basis-auto">
    <div class="relative">
      <UserCardList
        v-for="friend in friendList"
        :receiverId="friend.receiver"
        :initiatorId="friend.initiator"
        :channel="friend._id.toString()"
      />
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0;
}
</style>
