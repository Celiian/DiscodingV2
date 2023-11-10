<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import ServerCaterogyCard from "./ServerCaterogyCard.vue";
import ServerChannelNameCard from "./ServerChannelNameCard.vue";
import { useRoute } from "vue-router";
import { useServerStore } from "../../store/serverstore";

const serverStore = useServerStore();
const channels = ref<Array<any>>();
const categories = ref<Array<any>>();
const routes = useRoute();
const serverId = computed(() => {
  return routes.params.serverId as string;
});

watchEffect(async () => {
  const result = await serverStore.getChannelsServer(serverId.value);

  channels.value = result.channels;
  categories.value = result.categories;
});
</script>

<template>
  <ServerCaterogyCard
    v-for="category in categories"
    :categoryId="category._id"
    :categoryName="category.name"
    :channels="category.channels"
  />

  <ServerChannelNameCard
    v-for="(channel, index) in channels"
    :class="index === 0 ? 'mt-[20px]' : ''"
    :channelName="channel.name"
    :channelId="channel._id.toString()"
  />
</template>

<style scoped></style>
