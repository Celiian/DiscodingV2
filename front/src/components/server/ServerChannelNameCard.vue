<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import HashtagIcon from "../svg/HashtagIcon.vue";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  channelName: String,
  channelId: String,
});
//METHOD
function onClickChannel() {
  router.push("/server/" + route.params.serverId + "/" + "1/" + props.channelId);
}
</script>

<template>
  <div
    @click="onClickChannel"
    class="mt-[1px] ml-2 cursor-pointer py-[6px] px-2 flex items-center rounded hover:bg-white-200/10"
  >
    <div class="mr-[6px] h-[18px] w-[18px] flex justify-center items-center">
      <HashtagIcon class="fill-white-300/70" />
    </div>
    <div class="text-[16px] leading-5 font-medium grow shrink basis-auto text-white-400">
      {{ props.channelName }}
    </div>
  </div>
</template>

<style scoped></style>
