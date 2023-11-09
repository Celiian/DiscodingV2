<script setup lang="ts">
import { computed } from '@vue/reactivity';




const props= defineProps({
    buttonTitle : String,
    isSelected: Boolean
})
const emit = defineEmits(["click-filtered-button"]);

const selectedClass = computed(()=> ({
    'bg-white-600/10 text-white-600': props.isSelected,
}))

//METHOD
function onClickFilterButton(){
    emit("click-filtered-button")
}

</script>

<template>

    <div @click="onClickFilterButton" :class="selectedClass" class="min-w-[40px] text-center items-center flex justify-center rounded mx-2 py-[2px] px-[8px] cursor-pointer text-[16px] leading-5 font-semibold text-white-200 hover:text-white-400 hover:bg-white-500/5 transition-all duration-150 whitespace-nowrap">{{ props.buttonTitle }}</div>

</template>

<style scoped>
</style>
