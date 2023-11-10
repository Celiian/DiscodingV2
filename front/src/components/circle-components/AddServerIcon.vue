<script setup lang="ts">
import { ref } from "vue";
import CreateServerModal from "../modal/CreateServerModal.vue";
import PlusIcon from "../svg/PlusIcon.vue"

const modalOpened = ref(false);


//METHODS
function openModal() {
    modalOpened.value = true
}

function closeModal() {
    modalOpened.value = false
}

</script>

<template>
    <div @click="openModal" class="flex w-full justify-center relative mb-2 ">
        <div class="group">
            <!-- discord icon -->
            <div
                class=" w-[48px] h-[48px] flex items-center justify-center cursor-pointer bg-grey-400  group-hover:bg-green-circleIcon rounded-[50%] group-hover:rounded-2xl transition-all duration-300">
                <PlusIcon class="h-1/3 fill-green-circleIcon group-hover:fill-white-600 transition-all duration-300" />
            </div>

        </div>

    </div>
    <CreateServerModal v-if="modalOpened" @close-modal="closeModal" />
</template>

<style scoped></style>
