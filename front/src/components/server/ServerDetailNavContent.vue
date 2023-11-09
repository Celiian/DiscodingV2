<script setup lang="ts">
import ServerCaterogyCard from './ServerCaterogyCard.vue';
import ServerChannelNameCard from './ServerChannelNameCard.vue';


const aa = ["channel1", "channel2", "channel3"]
</script>


<template>
    <ServerCaterogyCard :channels="aa" />
    <ServerChannelNameCard :channelName="'ChannelName'" />
    <ServerChannelNameCard :channelName="'ChannelName'" />
    <ServerChannelNameCard :channelName="'ChannelName'" />
</template>


<style scoped></style>

