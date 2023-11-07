<script setup lang="ts">
import FriendIcon from '../svg/FriendIcon.vue';
import NewGroupIcon from '../svg/NewGroupIcon.vue';
import NotifInboxIcon from '../svg/NotifInboxIcon.vue';
import InfoIcon from '../svg/InfoIcon.vue';

</script>

<template>
    <div class="w-full flex justify-between" >

        <div class="flex items-center">
            
            <FriendIcon class="text-white-100 mx-2"/> <!-- friend icon-->

            <div class="mr-2"> <!-- friend text-->
                <h1 class="text-[16px] leading-5 font-semibold text-white-600">Amis</h1>
            </div>

            <div class="h-[24px] w-[0.5px] bg-grey-600 mx-2"></div> <!-- divider-->
            

            <div class="flex">
                
                <div class="min-w-[40px] text-center items-center flex justify-center rounded mx-2 py-[2px] px-[8px] cursor-pointer text-[16px] leading-5 font-semibold text-white-200 hover:text-white-400 hover:bg-white-500/5 transition-all duration-150 whitespace-nowrap">En ligne</div>

                <div class="min-w-[40px] text-center items-center flex justify-center rounded mx-2 py-[2px] px-[8px] cursor-pointer text-[16px] leading-5 font-semibold text-white-200 hover:text-white-400 hover:bg-white-500/5 transition-all duration-150 whitespace-nowrap">Tous</div>

                <div class="min-w-[40px] text-center items-center flex justify-center rounded mx-2 py-[2px] px-[8px] cursor-pointer text-[16px] leading-5 font-semibold text-white-200 hover:text-white-400 hover:bg-white-500/5 transition-all duration-150 whitespace-nowrap">En Attente</div>

                <div class="min-w-[40px] text-center items-center flex justify-center rounded mx-2 py-[2px] px-[8px] cursor-pointer text-[16px] leading-5 font-semibold text-white-200 hover:text-white-400 hover:bg-white-500/5 transition-all duration-150 whitespace-nowrap">Bloqué</div>

                <div class="min-w-[40px] text-center items-center flex justify-center rounded mx-2 py-[2px] px-[8px] cursor-pointer text-[16px] leading-5 font-semibold text-white-600 bg-green-buttonBg transition-all duration-150 whitespace-nowrap">Ajouter</div>

            </div>  <!-- div filter -->

        </div>

        

        <div class="flex items-center grow-0 shrink-0 basis-0">
            <div class="group h-[24px] w-[24px] mx-2 cursor-pointer">
                <NewGroupIcon class="fill-white-300 group-hover:fill-white-500 transition-all duration-150"/>
            </div>

            <div class="group h-[24px] w-[0.5px] bg-grey-600 mx-2"></div>

            <div class="group h-[24px] w-[24px] mx-2 cursor-pointer">
                <NotifInboxIcon class="fill-white-300 group-hover:fill-white-500 transition-all duration-150"/>
            </div>

            <div class="group h-[24px] w-[24px] mx-2 cursor-pointer">
                <InfoIcon class="fill-white-300 group-hover:fill-white-500 transition-all duration-150"/>
            </div>

        </div>  <!-- right icon -->


    </div>
</template>

<style scoped>
</style>
