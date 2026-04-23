<template>
  <div id="scrollable-container" class="m-6 w-full max-w-150 mx-auto flex flex-col relative h-180 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div v-if="page == 'main-page'">
      <!-- <SearchRoomInput @show-rooms="showRooms" />  -->
      <Rooms :rooms="rooms" @select-room="selectRoom" />
    </div>
    <!-- <Chat v-else-if="page == 'chat-page'" :room="selectedRoom" :name="name" /> -->
    <PaperChat v-else-if="page == 'chat-page'" :selectedRoom="selectedRoom" :name="name" />
  </div>
</template>

<script setup>
import { FwbAlert } from 'flowbite-vue'
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import roomService from '../services/room';
import Rooms from './Rooms.vue';
import PaperChat from './PaperChat.vue';

const authStore = useAuthStore();
const rooms = ref([]);
const selectedRoom = ref({});
const page = ref('main-page');

onMounted(async () => {
  rooms.value = await roomService.getRoomsByName(authStore.token);
})

function showRooms(value) {
  rooms.value = value.rooms;
  authStore.username = value.name;
}

function selectRoom(value) {
  selectedRoom.value = value;
  page.value = 'chat-page';
}
</script>