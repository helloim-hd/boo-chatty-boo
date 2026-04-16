<template>
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Users
        </h5>
        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Click to add user to chat.</p>
        <ul class="my-4 space-y-3">
            <li v-for="(user, index) in users">
                <fwb-button v-if="user.name != name" 
                    color="light" 
                    class="w-full cursor-pointer focus:ring-0 focus:ring-offset-0" 
                    size="lg"
                    @click="onNameClick(user, index)"
                >
                    {{ user.name }}
                </fwb-button>
            </li>
        </ul>
        <hr class="mt-8 mb-6 border-gray-200 dark:border-gray-700">
        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Added Users</p>
        <ul class="my-4 space-y-3">
            <li v-for="(user, index) in addedUsers">
                <div class="flex flex-row">
                    <fwb-button
                        disabled
                        color="light" 
                        class="w-full mr-3" 
                        size="lg"
                        @click="onNameClick(user, index)"
                    >
                        {{ user.name }}
                    </fwb-button>
                    <fwb-button 
                        class="cursor-pointer bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0" 
                        outline-none
                        @click="removeUser(user, index)"
                    >
                        <svg class="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                    </fwb-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { FwbButton, FwbModal } from 'flowbite-vue'
import { onMounted, ref } from 'vue';
import userService from '../services/user';

const users = ref([]);
const name = ref('');
const addedUsers = ref([]);

onMounted(async () => {
    const token = localStorage.getItem('token');
    // TODO: refactor to put information in vuex?
    name.value = localStorage.getItem('name')
    users.value = await userService.getUsers(token);
})

function onNameClick(user, index) {
    addedUsers.value.push(user);
    users.value.splice(index, 1);
}

function removeUser(user, index) {
    users.value.push(user);
    addedUsers.value.splice(index, 1);
}
</script>