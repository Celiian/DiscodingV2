<script setup lang="ts"></script>

<template>
  <div
    class="main -mt-0 w-[240px] h-full bg-grey-300 flex flex-col grow-0 shrink-0 basis-auto overflow-y-scroll overflow-x-hidden relative ">
    <nav class="flex flex-col flex-1">
      <div class="flex grow-0 shrink-0 basis-auto px-2 h-12 items-center shadow-customOne">
        <slot name="header"></slot>
      </div>

      <div class="flex-col grow-1 shrink-1 basis-auto w-full h-full">
        <slot name="content"></slot>
      </div>
    </nav>
    <div class=" h-[52px] min-h-[52px] bg-grey-200 flex grow-0 shrink-0 basis-auto w-[240px] fixed bottom-0">PUTE DEUX
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: block;
  opacity: 0;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}

.main:hover::-webkit-scrollbar-thumb {
  background: #1e1f22;

}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1e1f2200;
  border-radius: 20px;
}
</style>
