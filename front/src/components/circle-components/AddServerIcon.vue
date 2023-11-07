<script setup lang="ts">
import PlusIcon from "../svg/PlusIcon.vue"
</script>

<template>

    <div class="flex w-full justify-center relative mb-2 ">
        <div class="group">
            <!-- discord icon -->
            <div class=" w-[48px] h-[48px] flex items-center justify-center cursor-pointer bg-grey-400  group-hover:bg-green-circleIcon rounded-[50%] group-hover:rounded-2xl transition-all duration-300">

            
                <PlusIcon class="h-1/3 fill-green-circleIcon group-hover:fill-white-600 transition-all duration-300"/>
            </div>
            <!-- little white bar -->
            <div class="absolute h-[48px] w-2 top-0 left-0 flex items-center justify-start ">
                <div class="group-hover:h-[20px] h-[0px] w-full bg-white-400 block rounded-r-[4px] group-hover:-ml-[4px] -ml-[8px] transition-all duration-300"></div>
            </div>
        </div>
               
    </div>  

</template>

<style scoped>

</style>
