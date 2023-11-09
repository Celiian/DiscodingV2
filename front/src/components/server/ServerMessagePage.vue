<script setup lang="ts">
import ServerMessageHeader from "./ServerMessageHeader.vue"
import ServerMessageContent from "./ServerMessageContent.vue"
import MainContent from "../home/MainContent.vue";

</script>


<template>
    <MainContent>
        <template v-slot:header>
            <ServerMessageHeader />
        </template>
        <template v-slot:content>
            <ServerMessageContent />
        </template>
    </MainContent>
</template>


<style scoped></style>

