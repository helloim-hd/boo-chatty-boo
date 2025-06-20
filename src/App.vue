<template>
  <div>
    <div v-if="isSessionValid == null"></div>
    <LoginModal v-else-if="isSessionValid == false" @update-session="getSession"/>
    <Home v-else-if="isSessionValid == true" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chat from './components/Chat.vue';
import Home from './components/Home.vue';
import LoginModal from './components/LoginModal.vue';
import auth from './services/auth';

const isSessionValid = ref(null);
const token = ref('');

onMounted(async () => {
  token.value = localStorage.getItem('token');
  await getSession();
  console.log(token.value);
  console.log(isSessionValid.value);
})

async function getSession(emittedToken = null) {
  let currentToken = token.value;
  if (emittedToken) currentToken = emittedToken;
  const session = await auth.getSession(currentToken);
  isSessionValid.value = session.success;
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
