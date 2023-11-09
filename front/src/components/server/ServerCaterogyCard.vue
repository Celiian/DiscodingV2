<script setup lang="ts">
import { ref } from 'vue';
import DropdownIcon from '../svg/DropdownIcon.vue';
import ServerChannelNameCard from './ServerChannelNameCard.vue';

const props = defineProps({
    category: String,
    channels: Array<String>
})

const isChannelsShown = ref(false)

function showChannels() {
    isChannelsShown.value = !isChannelsShown.value
}


</script>


<template>
    <div>
        <div class="group pt-4 w-full flex items-center cursor-pointer " @click="showChannels">
            <div class="flex justify-center items-center">
                <DropdownIcon :class="!isChannelsShown ? '-rotate-90' : ''"
                    class="group-hover:fill-500 duration-150 transition-all" />
            </div>
            <h3
                class="group-hover:text-white-400 box-border text-ellipsis whitespace-nowrap overflow-hidden uppercase text-[11px] leading-4 font-semibold text-white-300/80">
                category
            </h3>
        </div>

        <ul class="w-full h-auto" :class="isChannelsShown ? 'block' : 'hidden'">
            <li v-for="channel in props.channels">
                <ServerChannelNameCard :channelName="channel" />
            </li>
        </ul>

    </div>
</template>


<style scoped></style>

