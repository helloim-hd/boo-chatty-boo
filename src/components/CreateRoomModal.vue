<template>
    <div>
        <button type="button" @click="showModal" class="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-3 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 cursor-pointer">Create Room</button>

        <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
            </template>
            <template #body>
                <input type="text" placeholder="Room" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </template>
            <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                Decline
                </fwb-button>
                <fwb-button @click="closeModal" color="blue">
                I accept
                </fwb-button>
            </div>
            </template>
        </fwb-modal>  
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'

const isShowModal = ref(false);

function showModal() {
    isShowModal.value = true;
}

function closeModal() {
    isShowModal.value = false;
}
</script>