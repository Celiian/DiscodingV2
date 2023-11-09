<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ServerCaterogyCard from './ServerCaterogyCard.vue';
import ServerChannelNameCard from './ServerChannelNameCard.vue';
import { useRoute } from 'vue-router';
import { useServerStore } from '../../store/serverstore';

const serverStore = useServerStore()

onMounted(async () => {
    const test = await serverStore.getChannelsServer(serverId.value)
    console.log(test.channels)
    console.log(test)
})

const routes = useRoute();

const serverId = computed(() => {
    return routes.params.serverId as string;
});



const aa = ["channel1", "channel2", "channel3"]
</script>


<template>
    <ServerCaterogyCard :channels="aa" />
    <ServerChannelNameCard :channelName="'ChannelName'" />
    <ServerChannelNameCard :channelName="'ChannelName'" />
    <ServerChannelNameCard :channelName="'ChannelName'" />
</template>


<style scoped></style>

