<template>
    <div class="max-h-full absolute inset-x-0 bottom-0">
        <div class="lines w-full" id="lines"></div>

        <ul class="list" id="message-list">
            <li v-for="(msg, index) in messages">
                <div v-if="msg['client_id'].trim() !== name.trim()" class="font-black text-purple-800 ml-12">
                  <span v-if="showName(index)" class="capitalize">{{ msg['client_id'] }}: </span>
                  <span>{{ msg.text }}</span>
                </div>
                <div v-else class="ml-12">
                  {{ msg.text }}
                </div>
            </li>
        </ul>
        
        <div class="relative w-full mt-5 sticky bottom-0"> 
            <input v-model="newMessage" @keyup.enter="sendMessage" type="text" class="message-box w-full focus:ring-0 mt-4" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onUpdated } from 'vue';
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
  scrollableElement.scrollTop = scrollableElement.scrollHeight;

  const lines = document.getElementById('lines');
  const list = document.getElementById('message-list');
  lines.style.height = `${list.scrollHeight}px`;
})

function sendMessage() {
  console.log("hello")
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
  return '';
}

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function showName(index) {
  return getPreviousName(index).trim() != messages.value[index]['client_id'].trim();
}
</script>

<style scoped>
body {
  background-color :#f5f5f5;
  width: 600px;
  margin: 0 auto;
  padding: 0;
}
h4 {
  color: #cd0000;
  font-size: 42px;
  letter-spacing: -2px;
  text-align: left;
}
.list {
  color: #555;
  font-size: 14px;
  padding: 0 !important;
  font-family: courier, monospace;
  border: 1px solid #dedede;
}
.list li {
  list-style: none;
  border-bottom: 1px dotted #ccc;
  /* text-indent: 25px; */
  height: auto;
  padding: 10px;
  /* text-transform: capitalize; */
}
.list li:hover {
  background-color: #f0f0f0;
  -webkit-transition: all 0.2s;
  -moz-transition:    all 0.2s;
  -ms-transition:     all 0.2s;
  -o-transition:      all 0.2s;
}
.lines {
  border-left: 1px solid #ffaa9f;
  border-right: 1px solid #ffaa9f;
  width: 2px;
  float: left;
  margin-left: 40px;
}
.message-box {
    list-style: none;
    border: 1px dotted #ccc;
    text-indent: 25px;
    height: auto;
    padding: 10px;
    /* text-transform: capitalize; */
    font-family: courier, monospace;
}
</style>