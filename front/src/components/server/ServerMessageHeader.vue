<script setup lang="ts">
import SearchIcon from '../svg/SearchIcon.vue';
import CloseIcon from '../svg/CloseIcon.vue';
import InfoIcon from '../svg/InfoIcon.vue';
import ToggleServerUser from '../svg/ToggleServerUser.vue';
import HashtagIcon from '../svg/HashtagIcon.vue';
import { ref, computed } from 'vue';

const input = ref('');
const searchIconClass = computed(() => ({
    'opacity-0': input.value.length !== 0,
    'opacity-100': input.value.length === 0
}))
const closeIconClass = computed(() => ({
    'opacity-100 rotate-0': input.value.length !== 0,
    'opacity-0': input.value.length === 0
}))

function ToggleServerUserPressed() {
    console.log('ToggleServerUserPressed')
}

function cleanInputValue() {
    input.value = ''
}

function inputSearchValidation() {
    console.log(input.value)
}

</script>


<template>
    <div class="w-full flex justify-between">

        <!-- speudo et logo-->
        <div class="relative flex items-center min-w-0 overflow-hidden grow shrink basis-auto box-border">
            <div>
                <div class="w-[24px] h-[24px] ml-2 mr-3 box-border relative rounded-full fill-white-200/70">
                    <HashtagIcon />
                </div>
            </div>

            <div class="min-w-[auto] shrink-0 grow-0 basis-auto mr-2 box-border">
                <h1
                    class="text-[16px] leading-5 font-semibold flex justify-start items-center overflow-hidden whitespace-nowrap box-border text-white-500">
                    Channel name</h1>
            </div>
        </div>




        <div class="flex items-center grow-0 shrink-0 basis-0">




            <!--icon-->
            <div class="group h-[24px] w-[24px] mx-2 cursor-pointer">
                <ToggleServerUser @click="ToggleServerUserPressed"
                    class="fill-white-300 group-hover:fill-white-500 transition-all duration-150" />
            </div>

            <!--search bar-->
            <div class="mx-2 box-border">
                <div class="relative overflow-visible box-border">
                    <div
                        class="flex justify-between h-[24px] w-[144px] focus-within:w-[250px] rounded cursor-text overflow-hidden px-[2px] bg-grey-100 transition-all duration-300">
                        <div class="relative  flex shrink grow basis-auto flex-wrap justify-center items-center min-w-0">
                            <input type="text" @keypress.enter="inputSearchValidation" v-model="input"
                                placeholder="Rechercher"
                                class=" h-[24px] text-[16px] leading-8 px-2 flex-1 min-w-[24px]  bg-black/0 box-border resize-none border-none outline-none placeholder:text-white-200 text-white-400 font-normal placeholder:font-normal">

                            <div class="h-full w-auto box-border flex justify-center items-center cursor-text">
                                <div class="w-4 h-4 relative flex justify-center items-center">
                                    <SearchIcon :class="searchIconClass"
                                        class="w-full h-full fill-white-300 absolute top-0 left-0 transition-all duration-300" />
                                    <CloseIcon :class="closeIconClass" @click="cleanInputValue"
                                        class="cursor-pointer w-full h-full fill-white-300 absolute top-0 left-0 rotate-90 duration-300 transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!--icon-->
            <a href="https://support.discord.com/hc/fr" target="_blank" class="group h-[24px] w-[24px] mx-2 cursor-pointer">
                <InfoIcon class="fill-white-300 group-hover:fill-white-500 transition-all duration-150" />
            </a>

        </div>


    </div>
</template>


<style scoped></style>

