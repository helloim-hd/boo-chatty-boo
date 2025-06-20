<template>
    <!-- Modal toggle -->
    <!-- <button @click="toggleModal" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Toggle modal
    </button> -->

    <!-- Main modal -->
    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 v-if="isSignInModal()" class="text-xl font-semibold text-gray-900 dark:text-white">
                        Sign In
                    </h3>
                    <h3 v-else class="text-xl font-semibold text-gray-900 dark:text-white">
                        Sign Up 
                    </h3>
                    <button @click="toggleModal" type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <form class="space-y-4" action="#">
                        <div>
                            <input v-model="name" placeholder="Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div>
                            <input v-model="password" type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>

                        <button v-if="isSignInModal()" @click="signIn" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <button v-else @click="signUp" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                        <div v-if="isSignInModal()" class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" @click.prevent="loadSignUpModal" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                        <div v-if="!isSignInModal()" class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already have an account? <a href="#" @click.prevent="loadSignInModal" class="text-blue-700 hover:underline dark:text-blue-500">Sign In</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Modal } from 'flowbite'
import auth from '../services/auth';

const modal = ref('');
const modalType = ref('sign-in');
const name = ref('');
const password = ref('');
const emit = defineEmits(['updateSession']);

onMounted(() => {
    const targetEl = document.getElementById('authentication-modal');
    const options = {
        placement: 'center',
        backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
        onHide: () => {
            console.log('modal is hidden');
        },
        onShow: () => {
            console.log('modal is shown');
        },
        onToggle: () => {
            console.log('modal has been toggled');
        }
    }; 
    modal.value = new Modal(targetEl, options);
    toggleModal();
  
})

function toggleModal() {
    modal.value.toggle();
}

function closeModal() {
    modal.value.hide();
}

function openModal() {
    console.log("here");
    modal.value.toggle();
}

function isSignInModal() {
    return modalType.value == 'sign-in';
}

function loadSignUpModal() {
    modalType.value = 'sign-up';
}

function loadSignInModal() {
    modalType.value = 'sign-in';
}

async function signUp() {
    const signUp = await auth.signUp(name.value, password.value);
}

async function signIn() {
    const signIn = await auth.signIn(name.value, password.value);
    localStorage.setItem('token', signIn.token);
    toggleModal();
    // send data to app that its been logged in
    emit('updateSession', signIn.token);
}
</script>