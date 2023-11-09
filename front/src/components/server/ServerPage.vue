<script setup lang="ts">
import { useRoute } from "vue-router";
import DetailNav from "../home/DetailNav.vue";
import { useServerStore } from "../../store/serverstore";
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import AddFriend from "../svg/AddFriendIcon.vue";
import DropdownMenu from "../svg/DropdownIcon.vue";
import Parameter from "../svg/ParameterIcon.vue";
import Modified from "../svg/ModifiedIcon.vue";
import CloseIcon from "../svg/CloseIconDropdown.vue";
import AddChannel from "../circle-components/AddChannel.vue";
import AddCategory from "../circle-components/addCategory.vue"
import ServerDetailNavContent from "../server/ServerDetailNavContent.vue"
import CreateChannelModal from "../modal/CreateChannel.vue"
import CreateCategoryModal from "../modal/CreateCategory.vue"
const serverStore = useServerStore();
const route = useRoute();
const server = ref<Server | null>(null); // Initialize as null
const dropdownRef = ref(null);

interface Server {
  name: string;
  icon: Blob;
  owner: string;
}

const isDropdownOpen = ref(false);
const currentModal = ref('');

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const modalOpened = ref(false);
watchEffect(() => {
  const newServerId = route.params.serverId as string;
  server.value = null;
  serverStore.getServerById({ id: newServerId }).then((data) => {
    server.value = data;
  });
});
const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && 'contains' in dropdownRef.value && !((dropdownRef.value as any).contains(event.target as Node))) {
    isDropdownOpen.value = false;
  }
};
function closeModal() {
  modalOpened.value = false
}
function openModal() {
  modalOpened.value = true;
}
// Ajoute cet écouteur d'événements lorsque le composant est monté
onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

// Retire l'écouteur d'événements lorsque le composant est démonté
onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});
const menuItems = ['Inviter des gens', 'Paramètres du serveur', 'Créer un salon','Créer une catégorie', 'Quitter le serveur'];
const menuClass = ['blue', 'grey','grey', "grey", "red"];
const menuSVG = [AddFriend, Parameter, AddChannel,AddCategory, Modified];


function callModal(index: number) {
  if (index === 2) {
    openChannelModal();
  }
  if(index === 3){
    openCategoryModal();
  }
}

function openChannelModal() {
  modalOpened.value = true;
  currentModal.value = 'channel';
}

function openCategoryModal() {
  modalOpened.value = true;
  currentModal.value = 'category';
}

</script>


<template>
    <CreateCategoryModal v-if="modalOpened && currentModal === 'category'" @open-modal="openModal" @close-modal="closeModal" />
    <CreateChannelModal v-if="modalOpened && currentModal === 'channel'" @open-modal="openModal" @close-modal="closeModal" />
    
  <DetailNav>
    <template v-slot:header>
      <div class="dropdown cursor-default">
        <p style="color:rgb(181 186 193);">
          {{ server?.name }}
        </p>
        <div class="cursor-pointer" ref="dropdownRef" @click="toggleDropdown" v-if="isDropdownOpen === false"
          style="align-self: center;">
          <DropdownMenu />
        </div>
        <div v-else @click="toggleDropdown">
          <CloseIcon />
        </div>
        <div v-show="isDropdownOpen" class="dropdown-content -top-10 right-0 absolute">
          <a v-for="(menuItem, index) in menuItems" :key="index" :class='menuClass[index]' @click="callModal(index)">
            {{ menuItem }}
            <component :is="menuSVG[index]" />
          </a>
        </div>
      </div>
    </template>


    <template v-slot:content>
      <ServerDetailNavContent />
    </template>

  </DetailNav>


  <router-view></router-view>
</template>


<style scoped>
.dropdown {
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}

.dropdown-content {
  padding: 10px;
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
  border-radius: 4px;
  font-size: 13px;
}

.blue {
  color: #959cf7;
}

.grey {
  color: #b5bac1;
}

.red {
  color: #f24042;
}

.dropdown-content a:hover {
  background-color: #4751c4;
  color: #ffffff;
}
</style>


