<script setup lang="ts">
import NotificationCircle from "../circle-components/NotificationCircle.vue"
const props = defineProps({
    notifNumber: Number,
    isSelected: Boolean
})
</script>

<template>
    <div class="flex w-full justify-center relative mb-2">
        <div class="group">
            <!-- discord icon -->
            <div
                class=" w-[48px] h-[48px] flex items-center justify-center cursor-pointer bg-grey-400 group-hover:bg-blue-200 rounded-[50%] group-hover:rounded-2xl transition-all duration-300">
                <img class="w-3/5" src="../../assets/discord-mark-white.svg">
            </div>
            <!-- little white bar -->
            <div class="absolute h-[48px] w-2 top-0 left-0 flex items-center justify-start ">
                <div
                    :class="isSelected ? 'bg-white-400 w-full rounded-r-[4px] h-[48px] -ml-[4px] transition-all duration-300' : 'group-hover:h-[20px] h-[0px] w-full bg-white-400 block rounded-r-[4px] group-hover:-ml-[4px] -ml-[8px] transition-all duration-300'">
                </div>
            </div>
        </div>

        <div class="absolute -bottom-1 right-2">
            <NotificationCircle v-if="props.notifNumber! > 0" :number="notifNumber!" />
        </div>

    </div>
</template>

<style scoped></style>
