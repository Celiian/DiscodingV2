<script setup lang="ts"></script>

<template>
  <div class="w-[240px] h-full bg-grey-300 flex flex-col grow-0 shrink-0 basis-auto">
    <nav class="flex flex-col flex-1">
      <div class="flex grow-0 shrink-0 basis-auto px-2 h-12 items-center shadow-customOne">
        <slot name="header"></slot>
      </div>

      <div class="flex-col grow-1 shrink-1 basis-auto w-full h-full">
        <slot name="content"></slot>
      </div>
    </nav>
    <div class="w-full h-[52px] min-h-[52px] bg-grey-200 flex grow-0 shrink-0 basis-auto"></div>
  </div>
</template>

<style scoped></style>
