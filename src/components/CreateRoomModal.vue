<template>
    <div>
        <button type="button" @click="showModal" class="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-3 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 cursor-pointer">Create Chat</button>
        

        <fwb-modal v-if="isShowModal" @close="closeModal">
            <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
            </template>
            <template #body>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
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