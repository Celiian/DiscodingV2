<script setup lang="ts">
import MessageIcon from "../svg/MessageIcon.vue";
import MoreIcon from "../svg/MoreIcon.vue";
import { useUserStore } from "../../store/userstore";
import { onMounted, ref, watch, watchEffect } from "vue";
import RoundedLogoIcon from "../circle-components/RoundedLogoIcon.vue";
import { useMessageStore } from "../../store/messagestore";

const props = defineProps({ 
  receiverId: String,
  initiatorId: String
 });
const user = ref(null);

const userStore = useUserStore();
const friendStore = useFriendsStore()


const currentUserId = userStore.getCurrentUser()._id.toString();
const currentUserIsInitiator = currentUserId === props.initiatorId ? true : false;
const messageStore = useMessageStore();
const props = defineProps({ id: String });
const user = ref(null);
const channel = ref();

watch(
  () => props,
  () => {
    getUser();
  }
);

onMounted(async () => {
  getUser();
});

async function getUser() {
  const res = await userStore.getUser({ id: currentUserIsInitiator ? props.receiverId! : props.initiatorId! || "" });

  if (res && res?.success) {
    user.value = res?.data;
  }
}


function onClickSendMp(){

}

function onClickMore(){

}

function onClickAccept(){
  friendStore.acceptFriend({receiver_id : props.receiverId! ,initiator_id : props.initiatorId!  })
}

function onClickRefuse(){
  friendStore.rejectFriend({receiver_id : props.receiverId!})
}

function onClickUnblock(){

}

=======

  for (let channelStored of messageStore.getCurrentChannels()) {
    if (channelStored?.users.includes(props.id)) {
      channel.value = channelStored;
    }
  }
});

</script>

<template>
  <!--friend card-->
  <div
    class="h-[62px] flex ml-[30px] mr-5 font-medium text-[16px] leading-5 overflow-hidden box-border cursor-pointer border-t-[1px] border-white-100/20 hover:bg-white-100/10 hover:border-white-100/0 rounded group/main"
  >
    <router-link
      :to="'/me/message/' + channel._id.toString() + '/' + props.id"
      class="flex grow items-center justify-between max-w-full px-2"
    >
      <!-- user info -->
      <div class="flex overflow-hidden">
        <!--user logo-->
        <div class="w-8 h-8 relative rounded-full mr-3">
          <RoundedLogoIcon :icon="(user as any)?.icon" />
        </div>
        <!-- user info-->
        <div class="flex flex-col overflow-hidden">
          <!--name-->
          <div class="flex grow items-center justify-start whitespace-nowrap">
            <span class="whitespace-nowrap text-ellipsis overflow-hidden font-semibold text-white-500">{{
              (user as any)?.username
            }}</span>
          </div>
          <!--subtitle-->
          <div class="text-[12px] text-white-300">
            <span class="whitespace-nowrap text-ellipsis overflow-hidden text-[12px]">Status</span>
          </div>
        </div>
      </div>

      <!--button icon-->
      <div class="flex ml-2">
        <div
          class="group cursor-pointer w-9 h-9 rounded-full flex justify-center items-center bg-grey-200"
          title="Envoyer un MP"
        >
          <MessageIcon class="fill-white-300 w-5 h-5 group-hover:fill-white-500" />
        </div>
        <div
          class="group cursor-pointer w-9 h-9 rounded-full flex justify-center items-center ml-[10px] bg-grey-200"
          title="More"
        >
          <MoreIcon class="fill-white-300 w-4 h-4 group-hover:fill-white-500" />
        </div>

        <!--accept request icon-->
        <div
          @click="onClickAccept"
          v-if="friendStore.displayed === 2 && !currentUserIsInitiator"
          class="group cursor-pointer w-9 h-9 rounded-full flex justify-center items-center ml-[10px] bg-grey-200/40 group-hover/main:bg-grey-200"
          title="More"
        >
          <AcceptIcon class="fill-white-300 w-5 h-5 group-hover:fill-green-circleIcon" />
        </div>
        <!-- refuse request icon-->
        <div
          @click="onClickRefuse"
          v-if="friendStore.displayed === 2"
          class="group cursor-pointer w-9 h-9 rounded-full flex justify-center items-center ml-[10px] bg-grey-200/40 group-hover/main:bg-grey-200"
          title="More"
        >
          <CloseIcon class="fill-white-300 w-5 h-5 group-hover:fill-red" />
        </div>
        <!--unblock friend icon-->
        <div
          @click="onClickUnblock"
          v-if="friendStore.displayed === 3"
          class="group cursor-pointer w-9 h-9 rounded-full flex justify-center items-center ml-[10px] bg-grey-200/40 group-hover/main:bg-grey-200"
          title="More"
        >
          <UnblockUserIcon class="fill-white-300 w-5 h-5 group-hover:fill-red" />
        </div>


      </div>
    </router-link>
  </div>
</template>

<style scoped></style>
