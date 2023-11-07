<script setup lang="ts"></script>

<template>
  <div class="flex flex-col overflow-hidden bg-grey-400 grow-1 shrink-1 basis-auto w-full">
    <div class="flex grow-0 shrink-0 basis-auto w-full p-2 h-12 shadow-customOne text-[16px] leading-5 justify-center">
      <!-- header slot  -->
      <slot name="header"></slot>
    </div>

    <!-- page slot -->
    <slot name="content"></slot>
  </div>
</template>

<style scoped></style>
