<script setup lang="ts">
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue";
import MessageIcon from "../svg/MessageIcon.vue"
import MoreIcon from "../svg/MoreIcon.vue"


//METHOD


</script>

<template>

    <!--friend card-->
    <div class="h-[62px] flex ml-[30px] mr-5 font-medium text-[16px] leading-5 overflow-hidden box-border cursor-pointer border-t-[1px] border-white-100/20 hover:bg-white-100/10 hover:border-none rounded">
                <div class="flex grow items-center justify-between max-w-full px-2">

                    <!-- user info -->
                    <div class="flex overflow-hidden">
                        <!--user logo-->
                        <div class="w-8 h-8 relative rounded-full mr-3 ">
                            <RoundedLogoIcon/>
                        </div>

                        <!-- user info-->
                        <div class="flex flex-col overflow-hidden">
                            <!--name-->
                            <div class="flex grow items-center justify-start whitespace-nowrap">
                                <span class="whitespace-nowrap text-ellipsis overflow-hidden font-semibold text-white-500">Titi</span>
                            </div>
                            <!--subtitle-->
                            <div class="text-[12px] text-white-300">
                                <span class="whitespace-nowrap text-ellipsis overflow-hidden text-[12px]">Status</span>
                            </div>
                        </div>
                    </div>

                    <!--button icon-->
                    <div class="flex ml-2">
                        <div class="group cursor-pointer w-9 h-9 rounded-full flex justify-center items-center bg-grey-200" title="Envoyer un MP">
                            <MessageIcon class="fill-white-300 w-5 h-5 group-hover:fill-white-500"/>
                        </div>
                        <div class="group cursor-pointer w-9 h-9 rounded-full flex justify-center items-center ml-[10px] bg-grey-200" title="More">
                            <MoreIcon class="fill-white-300 w-4 h-4 group-hover:fill-white-500"/>
                        </div>
                    </div>


                </div>
            </div>

</template>

<style scoped>

</style>
