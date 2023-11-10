<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useRoute } from "vue-router";
import DetailNav from "../home/DetailNav.vue";
import { useServerStore } from "../../store/serverstore";
import { onMounted, onUnmounted, ref, watchEffect, computed } from "vue";
import AddFriend from "../svg/AddFriendIcon.vue";
import DropdownMenu from "../svg/DropdownIcon.vue";
import Parameter from "../svg/ParameterIcon.vue";
import Modified from "../svg/ModifiedIcon.vue";
import CloseIcon from "../svg/CloseIconDropdown.vue";
import AddChannel from "../circle-components/AddChannel.vue";
import InvitePeopleModal from "../modal/InvitePeopleModal.vue";
import QuitServerModal from "../modal/QuitServerModal.vue";
import AddCategory from "../circle-components/addCategory.vue";
import ServerDetailNavContent from "../server/ServerDetailNavContent.vue";
import CreateChannelModal from "../modal/CreateChannel.vue";
import CreateCategoryModal from "../modal/CreateCategory.vue";
import { useUserStore } from "../../store/userstore";

const userStore = useUserStore();
const serverStore = useServerStore();
const route = useRoute();
const server = ref<Server | null>(null);
const dropdownRef = ref(null);

const currentUser = computed(() => {
  return userStore.getCurrentUser();
});
const serverId = computed(() => {
  return route.params.serverId as string;
});
const isCurrentUserIsAdmin = ref(false);

interface Server {
  name: string;
  icon: Blob;
  owner: string;
}

const isDropdownOpen = ref(false);
const currentModal = ref("");
const target = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const modalOpened = ref(false);
watchEffect(async () => {
  isCurrentUserIsAdmin.value =
    currentUser.value?._id.toString() === (await serverStore.getServerById({ id: serverId.value })).owner;
  const newServerId = route.params.serverId as string;
  server.value = null;
  serverStore.getServerById({ id: newServerId }).then((data) => {
    server.value = data;
  });
});
const handleClickOutside = (event: Event) => {
  if (
    dropdownRef.value &&
    "contains" in dropdownRef.value &&
    !(dropdownRef.value as any).contains(event.target as Node)
  ) {
    isDropdownOpen.value = false;
  }
};

function closeModal() {
  modalOpened.value = false;
}
function openModal() {
  modalOpened.value = true;
}

onClickOutside(target, () => (isDropdownOpen.value = false));

// Ajoute cet écouteur d'événements lorsque le composant est monté
onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

// Retire l'écouteur d'événements lorsque le composant est démonté
onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});

const dropDownItem = {
  0: {
    index: 0,
    item: "Inviter des gens",
    class: "blue",
    svg: AddFriend,
    show: false,
  },
  1: {
    index: 1,
    item: "Paramètres du serveur",
    class: "grey",
    svg: Parameter,
    show: true,
  },
  2: {
    index: 2,
    item: "Créer un salon",
    class: "grey",
    svg: AddChannel,
    show: true,
  },
  3: {
    index: 3,
    item: "Créer une catégorie",
    class: "grey",
    svg: AddCategory,
    show: true,
  },
  4: {
    index: 4,
    item: "Quitter le serveur",
    class: "red",
    svg: Modified,
    show: false,
  },
};

function callModal(index: number) {
  switch (index) {
    case 0:
      openInvitePeopleModal();
      break;
    case 1:
      break;
    case 2:
      openChannelModal();
      break;
    case 3:
      openCategoryModal();
      break;
    case 4:
      openQuitServerModal();
      break;
  }
}

function openChannelModal() {
  modalOpened.value = true;
  currentModal.value = "channel";
}

function openCategoryModal() {
  modalOpened.value = true;
  currentModal.value = "category";
}

function openInvitePeopleModal() {
  modalOpened.value = true;
  currentModal.value = "invite";
}

function openQuitServerModal() {
  modalOpened.value = true;
  currentModal.value = "quit";
}
</script>

<template>
  <CreateCategoryModal
    v-if="modalOpened && currentModal === 'category'"
    @open-modal="openModal"
    @close-modal="closeModal"
  />
  <CreateChannelModal
    v-if="modalOpened && currentModal === 'channel'"
    @open-modal="openModal"
    @close-modal="closeModal"
  />
  <InvitePeopleModal
    v-if="modalOpened && currentModal === 'invite'"
    @open-modal="openModal"
    @close-modal="closeModal"
  />
  <QuitServerModal v-if="modalOpened && currentModal === 'quit'" @open-modal="openModal" @close-modal="closeModal" />

  <DetailNav>
    <template v-slot:header>
      <div class="dropdown cursor-pointer" @click="toggleDropdown">
        <p style="color: rgb(181 186 193)">
          {{ server?.name }}
        </p>
        <div class="cursor-pointer" ref="dropdownRef" v-if="isDropdownOpen === false" style="align-self: center">
          <DropdownMenu class="fill-white-500/80" />
        </div>
        <div v-else @click="toggleDropdown">
          <CloseIcon />
        </div>
        <div ref="target" v-show="isDropdownOpen" class="dropdown-content -top-10 right-0 absolute">
          <div v-for="(menuItem, index) in dropDownItem">
            <a
              v-if="isCurrentUserIsAdmin === menuItem.show || isCurrentUserIsAdmin"
              :key="index"
              :class="menuItem.class"
              @click="callModal(menuItem.index)"
            >
              {{ menuItem.item }}
              <component :is="menuItem.svg" />
            </a>
          </div>
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
  z-index: 100;
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
