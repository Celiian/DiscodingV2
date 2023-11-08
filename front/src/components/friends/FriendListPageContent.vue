<script setup lang="ts">

//METHOD

import { ref } from 'vue';
import CloseIcon from '../svg/CloseIcon.vue';
import SearchIcon from '../svg/SearchIcon.vue';
import { computed } from '@vue/reactivity';

const input = ref('');
const searchIconClass = computed(()=>({
    'opacity-0' : input.value.length !== 0,
    'opacity-100' : input.value.length === 0
}))
const closeIconClass = computed(()=>({
    'opacity-100 rotate-0' : input.value.length !== 0,
    'opacity-0' : input.value.length === 0
}))



</script>

<template>

    <div class="mt-4 mr-5 mb-2 ml-[30px] bg-grey-100 overflow-hidden rounded box-border flex">
        <div class="relative flex shrink grow basis-auto flex-wrap p-[1px] items-center min-w-0">
            <input type="text" v-model="input" placeholder="Rechercher" class="h-[30px] text-[16px] leading-8 px-2 flex-1 min-w-[48px] m-[1px] bg-black/0 box-border resize-none border-none outline-none placeholder:text-white-200 text-white-400 font-normal placeholder:font-normal">

            <div class="h-8 w-8 box-border flex justify-center items-center cursor-text">
                <div class="w-5 h-5 relative">
                    <SearchIcon :class="searchIconClass" class="w-full h-full fill-white-300 absolute top-0 left-0 transition-all duration-300"/>
                    <CloseIcon :class="closeIconClass" class="w-full h-full fill-white-300 absolute top-0 left-0 rotate-90 duration-300 transition-all"/>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>

</style>
