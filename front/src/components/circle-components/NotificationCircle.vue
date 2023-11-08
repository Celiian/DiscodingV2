<script setup lang="ts">

const props = defineProps({
    notifNumber: Number
})

</script>

<template>
    <!-- notification circle -->
    <div class="-bottom-1 right-2 h-6 w-6 rounded-full flex justify-center items-center">
        <div
            class="min-w-[16px] min-h-[16px] h-4 w-auto text-center bg-red rounded-full flex justify-center items-center font-extrabold text-white-600 text-[11px]">
            {{
                props.notifNumber }} </div>
    </div>
</template>

<style scoped></style>
