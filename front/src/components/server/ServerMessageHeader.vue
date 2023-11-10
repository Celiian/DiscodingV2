<script setup lang="ts">
import SearchIcon from "../svg/SearchIcon.vue";
import CloseIcon from "../svg/CloseIcon.vue";
import InfoIcon from "../svg/InfoIcon.vue";
import ToggleServerUser from "../svg/ToggleServerUser.vue";
import HashtagIcon from "../svg/HashtagIcon.vue";
import { ref, computed, watch } from "vue";
import { useMessageStore } from "../../store/messagestore";
import { useUserStore } from "../../store/userstore";
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue";

const messageStore = useMessageStore();
const userStore = useUserStore();
const input = ref("");
const showModal = ref(false);
const result = ref<Array<any>>([]);
const displayed_result = ref<Array<any>>([]);
const index = ref<number>(0);
const userList = ref(new Map<string, any>());
const messages = computed(() => {
  return messageStore.getMessages();
});

interface Message {
  channel: string;
  sender: string;
  content: string;
  file: string;
  date: Date;
}

async function getUserList() {
  for (const message of messages.value) {
    if (!userList.value.has(message.sender)) {
      const user = (await userStore.getUser({ id: message.sender })).data;
      userList.value.set(user._id, user);
    }
  }
}
const searchIconClass = computed(() => ({
  "opacity-0": input.value.length !== 0,
  "opacity-100": input.value.length === 0,
}));
const closeIconClass = computed(() => ({
  "opacity-100 rotate-0": input.value.length !== 0,
  "opacity-0": input.value.length === 0,
}));

function formatDateToFrench(dateString: string) {
  const date = new Date(dateString);
  const locale = "fr-FR";
  return date.toLocaleDateString(locale);
}

watch(input, () => {
  if (input.value == "") {
    showModal.value = false;
  }
});

function prevPage() {
  if (index.value > 0) {
    index.value -= 5;
    updateDisplayedResults();
  }
}

function nextPage() {
  if (index.value / 5 < Math.floor((result.value.length - 1) / 5)) {
    index.value += 5;
    updateDisplayedResults();
  }
}

function updateDisplayedResults() {
  displayed_result.value = result.value.slice(index.value, index.value + 5);
}

function ToggleServerUserPressed() {
  console.log("ToggleServerUserPressed");
}

function cleanInputValue() {
  input.value = "";
}

async function inputSearchValidation() {
  if (input.value != "") {
    showModal.value = true;
    await getUserList();

    result.value = messages.value.filter((message: Message) => {
      return message.content.includes(input.value);
    });

    displayed_result.value = result.value.slice(index.value, index.value + 5);
    console.log(showModal);
  } else {
    showModal.value = false;
  }
}

function hideModal() {
  showModal.value = false;
}

function jump(id: string) {
  messageStore.setSearchedMessage(id);
}
</script>

<template>
  <div class="w-full flex justify-between">
    <!-- speudo et logo-->
    <div class="relative flex items-center min-w-0 overflow-hidden grow shrink basis-auto box-border">
      <div>
        <div class="w-[24px] h-[24px] ml-2 mr-3 box-border relative rounded-full fill-white-200/70">
          <HashtagIcon />
        </div>
      </div>

      <div class="min-w-[auto] shrink-0 grow-0 basis-auto mr-2 box-border">
        <h1
          class="text-[16px] leading-5 font-semibold flex justify-start items-center overflow-hidden whitespace-nowrap box-border text-white-500"
        >
          Channel name
        </h1>
      </div>
    </div>

    <div class="flex items-center grow-0 shrink-0 basis-0">
      <!--icon-->
      <div class="group h-[24px] w-[24px] mx-2 cursor-pointer">
        <ToggleServerUser
          @click="ToggleServerUserPressed"
          class="fill-white-300 group-hover:fill-white-500 transition-all duration-150"
        />
      </div>

      <!--search bar-->
      <div class="mx-2 box-border">
        <div class="relative overflow-visible box-border">
          <div
            class="flex justify-between h-[24px] w-[144px] focus-within:w-[250px] rounded cursor-text px-[2px] bg-grey-100 transition-all duration-300"
          >
            <div class="relative flex shrink grow basis-auto flex-wrap justify-center items-center min-w-0">
              <input
                type="text"
                @keypress.enter="inputSearchValidation"
                v-model="input"
                placeholder="Rechercher"
                class="h-[24px] text-[16px] leading-8 px-2 flex-1 min-w-[24px] bg-black/0 box-border resize-none border-none outline-none placeholder:text-white-200 text-white-400 font-normal placeholder:font-normal"
              />

              <div class="absolute top-6 min-w-fit z-30" :class="{ block: showModal, hidden: !showModal }">
                <div class="bg-grey-400 text-white-500 mx-auto rounded shadow-lg w-full">
                  <h2 class="text-lg font-semibold mb-4 text-center pt-1">Recherche :</h2>

                  <div v-for="message in displayed_result" class="p-4 relative" @click="jump(message._id.toString())">
                    <div class="w-full h-fit text-sm">
                      <div class="w-full h-full">
                        <div class="relative outline-none px-1 hover:bg-black/10">
                          <div class="min-h-[2.75rem] flex items-center">
                            <div @click="" class="min-w-[30px] min-h-[30px] w-[30px] h-[30px] cursor-pointer">
                              <RoundedLogoIcon :icon="userList.get(message.sender)?.icon" />
                            </div>

                            <div class="w-full h-full flex flex-col mx-5">
                              <!--message sender-->
                              <div class="flex items-center">
                                <span @click="" class="text-white-500 font-semibold cursor-pointer hover:underline">{{
                                  userList.get(message.sender)?.username
                                }}</span>
                                <span class="ml-2 text-[10px] text-white-100 font-semibold">
                                  {{ formatDateToFrench(message.date) }}</span
                                >
                              </div>

                              <!--message content-->
                              <div class="w-[95%]">
                                <span class="text-white-500 whitespace-break-spaces overflow-x-hidden break-words">{{
                                  message.content
                                }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="absolute bottom-4 right-5 jump-button">Jump</div>
                  </div>

                  <div class="flex justify-center mt-4 items-center">
                    <button @click="prevPage" class="text-white px-2 py-1 rounded hover:bg-grey-200">Précédent</button>
                    <p class="m-2">{{ index / 5 + " / " + Math.floor((result.length - 1) / 5) }}</p>
                    <button @click="nextPage" class="ml-2 text-white px-2 py-1 rounded hover:bg-grey-200">
                      Suivant
                    </button>
                  </div>

                  <button @click="hideModal" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Close
                  </button>
                </div>
              </div>

              <div class="h-full w-auto box-border flex justify-center items-center cursor-text">
                <div class="w-4 h-4 relative flex justify-center items-center">
                  <SearchIcon
                    :class="searchIconClass"
                    class="w-full h-full fill-white-300 absolute top-0 left-0 transition-all duration-300"
                  />
                  <CloseIcon
                    :class="closeIconClass"
                    @click="cleanInputValue"
                    class="cursor-pointer w-full h-full fill-white-300 absolute top-0 left-0 rotate-90 duration-300 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--icon-->
      <a href="https://support.discord.com/hc/fr" target="_blank" class="group h-[24px] w-[24px] mx-2 cursor-pointer">
        <InfoIcon class="fill-white-300 group-hover:fill-white-500 transition-all duration-150" />
      </a>
    </div>
  </div>
</template>

<style scoped></style>
