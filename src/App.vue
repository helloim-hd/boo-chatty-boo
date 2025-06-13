<template>
  <div>
    <LoginModal v-if="!isSessionValid" />
    <Home v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chat from './components/Chat.vue';
import Home from './components/Home.vue';
import LoginModal from './components/LoginModal.vue';
import auth from './services/auth';

const isSessionValid = ref(false);

onMounted(async () => {
  await getSession();
})

async function getSession() {
  const session = await auth.getSession();
  isSessionValid.value = session.success;
  console.log(session)
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
