<script setup lang="ts">
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue";
import CloseIcon from "../svg/CloseIcon.vue";
import { useUserStore } from "../../store/userstore";
import { watchEffect, ref } from "vue";

const userStore = useUserStore();

const friendId = ref("");
const friend = ref(null);

const props = defineProps({
  channel: null,
});

watchEffect(async () => {
  friendId.value = props.channel.users.filter((id: any) => id !== userStore.getCurrentUser()._id)[0];
  const res = await userStore.getUser({ id: friendId.value });
  if (res) {
    friend.value = res.data;
  }

  console.log(friend.value);
});

//METHOD
function onClickOnCard() {
  console.log("card clicked");
}
function onClickCloseButton() {
  console.log("close button clicked");
}
</script>

<template>
  <li
    @click="onClickOnCard"
    class="group relative max-w-[224px] ml-2 box-border block px-2 py-[1px] rounded hover:bg-white-100/10 transition-all duration-150"
  >
    <router-link
      :to="'/me/message/' + (channel as any)?._id + '/' + (friend as any)?._id"
      class="flex items-center box-border w-full cursor-pointer"
    >
      <!--user logo-->
      <div class="w-8 h-8 relative rounded-full mr-3">
        <RoundedLogoIcon />
      </div>

      <!-- user info-->
      <div class="flex flex-col overflow-hidden">
        <!--name-->
        <div class="flex grow items-center justify-start whitespace-nowrap">
          <span
            class="whitespace-nowrap text-ellipsis overflow-hidden font-semibold text-white-200 group-hover:text-white-400 transition-all duration-150"
          >
            {{ (friend as any)?.username || "" }}
          </span>
        </div>
        <!--subtitle-->
        <div class="text-[12px] text-white-300 group-hover:text-white-400">
          <span class="whitespace-nowrap text-ellipsis overflow-hidden text-[12px]">Status</span>
        </div>
      </div>

      <div class="absolute hidden group-hover:flex justify-center items-center transition-all duration-150 right-4">
        <CloseIcon @click="onClickCloseButton" class="fill-white-300 w-2/3 hover:fill-white-500" />
      </div>
    </router-link>
  </li>
</template>

<style scoped></style>
