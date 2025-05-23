<template>
  <div v-for="data in rooms" class="m-2">
    <div
      href="#"
      class="bmax-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer mt-5"
      @click="$emit('selectRoom', data.room)"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ data.room }}
      </h5>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ably from '../services/ably';

const props = defineProps({
  rooms: Array,
});
const emit = defineEmits(['selectRoom']);

let chatClient, room;

async function selectRoom(value) {
  //chatClient = new ChatClient(ably);
  //room = await chatClient.rooms.get(value, AllFeaturesEnabled);
}
</script>
