<script setup lang="ts">
import PrivateMessageCircleIcon from "../circle-components/PrivateMessageCircleIcon.vue";
import ServerCircleIcon from "../circle-components/ServerCircleIcon.vue";
</script>


<template>

    <nav class="w-[72px] min-w-[72px] bg-grey-100 overflow-hidden overflow-y-scroll pt-3">
        <PrivateMessageCircleIcon/>

        <div class="w-full flex justify-center mb-2">
            <div class="w-[32px] h-[2px] bg-grey-400"></div>
        </div>
        
        <ServerCircleIcon/>
    </nav>

</template>

<style scoped>

nav::-webkit-scrollbar{
    display: none;
}

</style>
