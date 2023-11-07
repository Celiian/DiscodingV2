<script setup lang="ts">
import { computed } from '@vue/reactivity';


const props= defineProps({
    buttonTitle : String,
    isSelected: Boolean
})
const emit = defineEmits(["click-add-friends-button"]);

const selectedClass = computed(()=> ({
    'bg-green-buttonBg/0 text-green-circleIcon': props.isSelected,
}))

//METHOD
function onClickAddFriendButton(){
    emit("click-add-friends-button")
}

</script>

<template>

    <div @click="onClickAddFriendButton" :class="selectedClass" class="min-w-[40px] text-center items-center flex justify-center rounded mx-2 py-[2px] px-[8px] cursor-pointer text-[16px] leading-5 font-semibold text-white-600 bg-green-buttonBg transition-all duration-150 whitespace-nowrap">Ajouter</div>
</template>

<style scoped>
</style>
