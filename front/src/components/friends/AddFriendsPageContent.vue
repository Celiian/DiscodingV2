<script setup lang="ts">
import { ref } from "vue";
import AddFriendIllustration from "../svg/AddFriendIllustration.vue";
import { computed } from "@vue/reactivity";
import { useFriendsStore } from "../../store/friendsstore";

const input = ref("");
const isButtonDisabled = computed(() => {
  return input.value.length === 0 ? true : false;
});
const friendsstore = useFriendsStore();

//METHOD
function sendFriendRequest() {
  friendsstore.addNewFriend({ receiver_name: input.value });
}
</script>

<template>
  <div class="flex flex-col overflow-y-scroll grow shrink basis-auto">
    <div class="py-[20px] px-[30px] border-b-[0.5px] border-grey-600">
      <h2 class="text-[16px] leading-5 font-semibold mb-2 text-white-600">AJOUTER</h2>

      <div class="text-[14px] leading-5 font-normal text-white-200">
        Tu peux ajouter des amis grâce à leurs noms d'utilisateur Discord.
      </div>

      <div
        class="flex relative items-center rounded-lg mt-4 bg-grey-200 px-3 focus-within:ring-[1px] focus-within:ring-[#03a1f1] ring-inset"
      >
        <div class="flex grow shrink basis-auto mr-4 py-1 text-[16px] font-medium leading-5 whitespace-pre">
          <input
            maxlength="37"
            v-model="input"
            placeholder="Tu peux ajouter des amis grâce à leurs noms d'utilisateur Discord."
            type="text"
            class="bg-black/0 text-white-600 h-[40px] outline-none placeholder:text-white-100 w-full placeholder:font-normal"
          />
        </div>

        <button
          @click="sendFriendRequest"
          :disabled="isButtonDisabled"
          class="bg-blue-200 h-8 min-h-[32px] w-auto min-w-[50px] relative flex justify-center items-center rounded-[3px] text-[14px] leading-4 font-medium px-[16px] py-[2px] hover:bg-blue-100 transition-all duration-300 disabled:bg-blue-100/50 disabled:cursor-not-allowed group"
        >
          <div
            class="group-disabled:text-white-200 text-white-600 my-0 mx-auto whitespace-nowrap text-ellipsis overflow-hidden transition-all duration-300"
          >
            Envoyer une demande d'ami
          </div>
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-10 w-full justify-center items-center mt-8">
      <AddFriendIllustration />
      <p class="text-[16px] leading-5 text-center text-white-100">
        Wumpus attend des amis. Mais rien ne t'oblige à en ajouter !
      </p>
    </div>
  </div>
</template>

<style scoped></style>
../../store/friendsStore
