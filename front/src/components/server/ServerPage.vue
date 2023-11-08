<script setup lang="ts">
import MainContent from "../home/MainContent.vue";
import { useRoute } from "vue-router";
import DetailNav from "../home/DetailNav.vue";
import { useServerStore } from "../../store/serverstore";
import { ref, watchEffect } from "vue";
import AddFriend from "../svg/AddFriendIcon.vue";
import DropdownMenu from "../svg/DropdownIcon.vue";
import Parameter from "../svg/ParameterIcon.vue";
import Modified from "../svg/ModifiedIcon.vue";
import CloseIcon from "../svg/CloseIconDropdown.vue";
const serverStore = useServerStore();
const route = useRoute();
const server = ref<Server | null>(null); // Initialize as null

interface Server {
  name: string;
  icon: Blob;
  owner: string;
}

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  console.log(isDropdownOpen.value);
  
};

watchEffect(() => {
  const newServerId = route.params.serverId as string;
  server.value = null;
  serverStore.getServerById({ id: newServerId }).then((data) => {
    server.value = data;
  });
});

const menuItems = ['Inviter des gens','Paramètres du serveur', 'Quitter le serveur'];
const menuColor = ['#959cf7', "#b5bac1", "#f24042"];
const menuSVG = [AddFriend, Parameter, Modified];

</script>


<template>
  <DetailNav>
    <template v-slot:header>
      <div class="dropdown" @click="toggleDropdown">
        <p style="color:rgb(181 186 193);">
          {{ server?.name }}
        </p>
        <div v-if="isDropdownOpen===false" style="align-self: center;"><DropdownMenu /></div>
        <div v-else><CloseIcon /></div>
        <div v-show="isDropdownOpen" class="dropdown-content">

          <a v-for="(menuItem, index) in menuItems" :key="index" :style="{ color: menuColor[index] }">
            {{ menuItem }}
            <component :is="menuSVG[index]"/>
          </a>

          
        </div>
      </div>
    </template>

    <template v-slot:content></template>
  </DetailNav>
  <MainContent>
    <template v-slot:header> header</template>
    <template v-slot:content> </template>
  </MainContent>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: flex;
  cursor: pointer;
  flex-grow: 1;
  justify-content: space-between;
}
.dropdown-content {
  flex-direction: column;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 6vw;
  width: 100%;
  background-color: #000000;
  border-radius: 4px;

}
.dropdown-content a {
  box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 32px;
    padding: 6px 8px;
  color: rgb(181 186 193);
}

</style>
