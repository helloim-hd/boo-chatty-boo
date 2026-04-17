<template>
    <div>
        <button type="button" @click="showModal" class="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-3 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 cursor-pointer">Create Room</button>

        <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #body>
                <div class="mb-4">
                    <input v-model="roomName" type="text" placeholder="Room" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div>
                    <NameList 
                        :current-user-name="name"
                        :users="users"
                        :added-users="addedUsers"   
                        @add-user="addUser"
                        @remove-user="removeUser"
                    />
                </div>
            </template>
            <template #footer>
            <div class="flex justify-between">
                <fwb-button 
                    @click="closeModal" 
                    color="alternative"
                    class="focus:ring-0 focus:ring-offset-0 cursor-pointer"
                >
                    Close
                </fwb-button>
                <fwb-button 
                    :disabled="isConfirmDisabled()" 
                    color="purple"
                    class="disabled:bg-gray-300 cursor-pointer"
                    @click="createRoom"
                >
                    Create Room
                </fwb-button>
            </div>
            </template>
        </fwb-modal>  
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'
import NameList from './NameList.vue';
import userService from '../services/user';
import roomService from '../services/room';

const isShowModal = ref(false);
const users = ref([]);
const name = ref('');
const addedUsers = ref([]);
const roomName = ref('');

onMounted(async () => {
    const token = localStorage.getItem('token');
    // TODO: refactor to put information in pinia? or local component is enough?
    name.value = localStorage.getItem('name');
    users.value = await userService.getUsers(token);
})

watch([roomName, addedUsers], () => {
    isConfirmDisabled();
}, {deep: true})

function showModal() {
    isShowModal.value = true;
}

function closeModal() {
    isShowModal.value = false;
}

function addUser(data) {
    addedUsers.value.push(data.user);
    users.value.splice(data.index, 1);
}

function removeUser(data) {
    users.value.push(data.user);
    addedUsers.value.splice(data.index, 1);
}

function isConfirmDisabled() {
    return addedUsers.value.length === 0 || !roomName.value;
}

async function createRoom() {
    const user = users.value.find(u => u.name === name.value); 
    addedUsers.value.push(user);
    await roomService.createRoom({
        room: roomName.value,
        users: addedUsers.value
    })
    closeModal();
}
</script>