<template>
  <div class="m-6 absolute inset-x-0 bottom-0 h-16">
    <div v-for="(msg, index) in messages" class="flex flex-col items-start">
      <OthersChatBubble
        v-if="msg['client_id'].trim() !== name.trim()"
        :message="msg.text"
        :name="msg['client_id']"
        :previousName="getPreviousName(index)"
      />
      <MyChatBubble v-else :message="msg.text" />
    </div>

    <div class="relative w-full mt-5 sticky bottom-0">
      <input
        v-model="newMessage"
        class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Message"
        required
        @keyup.enter="sendMessage"
      />
      <button
        class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
        @click="sendMessage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onUpdated } from 'vue';
import MyChatBubble from './MyChatBubble.vue';
import OthersChatBubble from './OthersChatBubble.vue';
import { ChatClient } from '@ably/chat';
import ablyService from '../services/ably';
import roomService from '../services/room';
import popSound from '../assets/pop.mp3';

const newMessage = ref('');
const messages = ref([]);

const props = defineProps({
  room: String,
  name: String,
});

let chatClient, ablyRoom;

onMounted(async () => {
  messages.value = await roomService.getHistoryByRoom(props.room);

  chatClient = new ChatClient(ablyService.connectToAbly(props.name));
  ablyRoom = await chatClient.rooms.get(props.room, {
    occupancy: { enableEvents: true },
  });
  ablyRoom.messages.subscribe((msgObject) => {
    const audio = new Audio(popSound);
    audio.play();
    messages.value.push({
      ['client_id']: msgObject.message.clientId,
      text: msgObject.message.text,
    });
  });

  /** 💡 Attach to the room to subscribe to messages 💡 */
  await ablyRoom.attach();
});

onUpdated(() => {
  const scrollableElement = document.getElementById('scrollable-container');
  scrollableElement.scrollTop = scrollableElement.scrollHeight
})

//onBeforeUnmount(() => {
// if (ablyRoom) {
//  await ablyRoom.detach();
// }
// });

function sendMessage() {
  const messageData = {
    name: name.value,
    message: newMessage.value,
  };
  ablyRoom.messages.send({ text: newMessage.value });
  roomService.saveMessage({
    room: props.room,
    name: props.name,
    message: newMessage.value,
  });
  newMessage.value = '';
}

function getPreviousName(index) {
  if (index > 0) {
    return messages.value[index - 1]['client_id'];
  }
}
</script>
