<template>
  <div class="chat-container">
    <h1>this is a test</h1>
    <div class="message-list">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        {{ msg.data.name }}: {{ msg.data.message }}
      </div>
    </div>
    <div class="input-area">
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as Ably from 'ably';

const channel = ref(null);
const newMessage = ref('');
const messages = ref([]);
const name = ref('');
const ably = new Ably.Realtime({
  authUrl: 'https://personal-chat-backend.vercel.app/chat',
});

onMounted(() => {
  // name.value = window.prompt('Please enter your name.', 'Anonymous');
  channel.value = ably.channels.get('chat');
  console.log('creating channel');
  // need to subscribe so that you can receive messages to the channgel
  channel.value.subscribe('message', (msg) => {
    console.log('client receive ', msg);
    messages.value.push(msg);
  });
  // put in database
});

onBeforeUnmount(() => {
  if (channel.value) {
    channel.value.unsubscribe();
  }
});

function sendMessage() {
  //if (newMessage.value) {
  //channel.value.publish('message', newMessage.value);
  // newMessage.value = '';
  //}
  const messageData = {
    name: name.value,
    message: newMessage.value,
  };
  channel.value.publish('message', messageData);
  // enter in database
}
</script>
