<script setup lang="ts">
import AddServerIcon from "../circle-components/AddServerIcon.vue";
import PrivateMessageCircleIcon from "../circle-components/PrivateMessageCircleIcon.vue";
import SearchServerIcon from "../circle-components/SearchServerIcon.vue";
import ServerCircleIcon from "../circle-components/ServerCircleIcon.vue";
</script>


<template>

    <nav class="w-[72px] min-w-[72px] bg-grey-100 pt-3">
        <PrivateMessageCircleIcon/>

        <div class="w-full flex justify-center mb-2">
            <div class="w-[32px] h-[2px] bg-grey-400"></div>
        </div>

        <!-- serveur icon list -->
        <ServerCircleIcon/>
        

        <AddServerIcon/>
        <SearchServerIcon/>

    </nav>

</template>

<style scoped>

nav::-webkit-scrollbar{
    display: none;
}

nav{
    overflow-y: scroll;
    overflow-x: visible;
}

</style>
