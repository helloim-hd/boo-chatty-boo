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
import { useCookies } from "vue3-cookies";

const isSessionValid = ref(false);
const token = ref('');

const { cookies } = useCookies();

onMounted(async () => {
  // get token from cookies and send using req header authorisation with bearer
  token.value = cookies.get('token');
  console.log("token ", token.value)
  await getSession(token.value);
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
