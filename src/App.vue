<template>
  <div>
    <div v-if="authStore.isAuthenticated == null"></div>
    <LoginModal v-else-if="authStore.isAuthenticated == false" @update-session="getSession"/>
    <Home v-else-if="authStore.isAuthenticated == true" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from './stores/auth'; 
import Home from './components/Home.vue';
import LoginModal from './components/LoginModal.vue';
import auth from './services/auth';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.checkSession();
})
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
