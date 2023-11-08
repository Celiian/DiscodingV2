<script setup lang="ts">
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue"
import CloseIcon from "../svg/CloseIcon.vue"


const props = defineProps({

    userName : String,
    date: String,
    messageContent: String
})
console.log(props)


//METHOD
function onClickOnCard(){
    console.log("card clicked")
}
function onClickCloseButton(){
    console.log('close button clicked')
}

</script>


<template>
    
    <li @click="onClickOnCard" class="group relative max-w-[224px] ml-2 box-border block px-2 py-[1px] rounded hover:bg-white-100/10 transition-all duration-150">
        <div class="flex items-center box-border w-full cursor-pointer">
            <!--user logo-->
            <div class="w-8 h-8 relative rounded-full mr-3 ">
                <RoundedLogoIcon/>
            </div>

            <!-- user info-->
            <div class="flex flex-col overflow-hidden">
                <!--name-->
                <div class="flex grow items-center justify-start whitespace-nowrap">
                    <span class="whitespace-nowrap text-ellipsis overflow-hidden font-semibold text-white-200 group-hover:text-white-400 transition-all duration-150">Titi</span>
                </div>
                <!--subtitle-->
                <div class="text-[12px] text-white-300 group-hover:text-white-400">
                    <span class="whitespace-nowrap text-ellipsis overflow-hidden text-[12px]">Status</span>
                </div>
            </div>

            <div class="absolute hidden group-hover:flex justify-center items-center transition-all duration-150 right-4">
                <CloseIcon @click="onClickCloseButton" class="fill-white-300 w-2/3 hover:fill-white-500"/>
            </div>     
        </div>
      </li>

</template>

<style scoped>
</style>
