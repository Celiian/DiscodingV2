<script setup lang="ts">
import FriendIcon from "../svg/FriendIcon.vue";
import NewGroupIcon from "../svg/NewGroupIcon.vue";
import NotifInboxIcon from "../svg/NotifInboxIcon.vue";
import InfoIcon from "../svg/InfoIcon.vue";
import FilterButton from "./FilterButton.vue";
import AddFriendsButton from "./AddFriendsButton.vue";
import { ref, watch } from "vue";
import { computed } from "@vue/reactivity";
import { useFriendsStore } from "../../store/friendsstore";

const filteredButtons = ["En ligne", "Tous", "En attente", "Bloqué"];
const buttonSelectedIndex = ref<number>();
const friendsstore = useFriendsStore();

const isAddFriendsPageShown = computed(() => {
  return buttonSelectedIndex.value === -1 ? true : false;
});

watch(buttonSelectedIndex, (newValue) => {
  friendsstore.setDisplayed(newValue as number);
});

const emit = defineEmits(["show-add-or-list-friend-page"]);

//METHOD
function onClickFilterButton(index: number) {
  buttonSelectedIndex.value = index;

  //action here
  emit("show-add-or-list-friend-page", isAddFriendsPageShown.value);
}

function onClickAddFriendsButton() {
  buttonSelectedIndex.value = -1;

  //action here
  emit("show-add-or-list-friend-page", isAddFriendsPageShown.value);
}
</script>

<template>
  <div class="w-full flex justify-between">
    <div class="flex items-center">
      <FriendIcon class="text-white-100 mx-2" />
      <!-- friend icon-->
      <div class="mr-2 cursor-default">
        <!-- friend text-->
        <h1 class="text-[16px] leading-5 font-semibold text-white-600">Amis</h1>
      </div>
      <div class="h-[24px] w-[0.5px] bg-grey-600 mx-2"></div>
      <!-- divider-->

      <div class="flex">
        <!--filtered buttons-->
        <div v-for="(button, index) in filteredButtons">
          <FilterButton
            :buttonTitle="button"
            :isSelected="buttonSelectedIndex === index"
            :key="index"
            @click="onClickFilterButton(index)"
          />
        </div>
        <AddFriendsButton @click="onClickAddFriendsButton" :isSelected="buttonSelectedIndex === -1" />
      </div>
    </div>

    <div class="flex items-center grow-0 shrink-0 basis-0">
      <div class="group h-[24px] w-[24px] mx-2 cursor-pointer">
        <NewGroupIcon class="fill-white-300 group-hover:fill-white-500 transition-all duration-150" />
      </div>

      <div class="group h-[24px] w-[0.5px] bg-grey-600 mx-2"></div>
      <!--divider-->

      <div class="group h-[24px] w-[24px] mx-2 cursor-pointer">
        <NotifInboxIcon class="fill-white-300 group-hover:fill-white-500 transition-all duration-150" />
      </div>

      <div class="group h-[24px] w-[24px] mx-2 cursor-pointer">
        <InfoIcon class="fill-white-300 group-hover:fill-white-500 transition-all duration-150" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
../../store/friendsStore
