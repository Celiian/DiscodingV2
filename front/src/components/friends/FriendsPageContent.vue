<script setup lang="ts">
import AddFriendsPageContent from '../friends/AddFriendsPageContent.vue';
import FriendListPageContent from './FriendListPageContent.vue';

const props = defineProps({
    isAddFriendsPageShown : Boolean
})

</script>

<template>

    <AddFriendsPageContent v-if="props.isAddFriendsPageShown"  />
    <FriendListPageContent v-else/>

</template>

<style scoped>
::-webkit-scrollbar{
    width: 0;
}
</style>
