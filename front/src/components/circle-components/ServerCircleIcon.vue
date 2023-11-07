<script setup lang="ts">
import NotificationCircle from './NotificationCircle.vue';

</script>

<template>

    <div class="flex w-full justify-center relative mb-2">
        <div class="group">
            <div class="w-[48px] h-[48px] flex items-center justify-center cursor-pointer rounded-[50%] group-hover:rounded-2xl transition-all duration-300 overflow-hidden bg-[url('./assets/server_example.png')] bg-cover bg-center">
            </div>
            <div class="absolute h-[48px] w-2 top-0 left-0 flex items-center justify-start ">
                <div class="h-[8px] group-hover:h-[20px] w-full bg-white-600 block rounded-r-[4px] -ml-[4px] transition-all duration-300"></div>
            </div>

            <div class="group-hover:block hidden absolute origin-center top-1 -right-full bg-black p-2 text-white-600 z-[10]">
                <div class="bg-black "></div>
                Message Privé
            </div>

            <NotificationCircle/>
        </div>

        
        
    </div>  

</template>

<style scoped>

</style>
