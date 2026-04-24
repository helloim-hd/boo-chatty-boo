<template>
  <div class="m-2">
    <RoomsHeader />
    <CreateRoomModal @room-created="addCreatedRoom"/>
    <div v-for="data in rooms">
      <div
        href="#"
        class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer mt-5 flex justify-between"
        @click="$emit('selectRoom', data)"
      >
        <h5
          class="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
        {{  data.room  }}
        </h5>

        <fwb-button 
            class="cursor-pointer bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0" 
            outline-none
            @click="$emit('removeUser', {user, index})"
        >
        <svg class="w-[28px] h-[28px] text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>

        </fwb-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { FwbButton } from 'flowbite-vue';
import roomService from '../services/room';
import CreateRoomModal from './CreateRoomModal.vue';  
import RoomsHeader from './RoomsHeader.vue';


const emit = defineEmits(['selectRoom']);
const authStore = useAuthStore();
const rooms = ref([]);

onMounted(async () => {
  rooms.value = await roomService.getRoomsByName(authStore.token);
})

function addCreatedRoom(roomDetails) {
  rooms.value.push(roomDetails);
}
</script>
