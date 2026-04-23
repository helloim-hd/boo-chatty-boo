import { defineStore } from 'pinia';
import { ref } from 'vue';
import auth from '../services/auth.js';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
    const loginMessage = ref('');
    const username = useLocalStorage('username', null);
    const token = useLocalStorage('token', null);
    const isAuthenticated = ref(null);

    const checkSession = async () => {
        try {
            const result = await auth.getSession(token.value);
            isAuthenticated.value = true;
        } catch (err) {
            isAuthenticated.value = false;
        }
    }

    const signIn = async (name, password) => {
        try {
            const signIn = await auth.signIn(name, password);
            token.value = signIn.token;
            username.value = name;
            // localStorage.setItem('token', signIn.token);
            token.value = signIn.token;
            username.value = name;
            // localStorage.setItem('username', name);
            isAuthenticated.value = true;

        } catch (err) {
            if (err.message == 'Incorrect password') {
                loginMessage.value = 'Invalid login credentials';
            } else if (err.message == 'User does not exist') {
                loginMessage.value = 'User is not registered'
            } else {
                loginMessage.value = 'Unable to login. Try again later.'
            }
        }
    }


    const signUp = async (name, password) => {
        try {
            const signUp = await auth.signUp(name, password);
            token.value = signUp.token;
            username.value = name;
            localStorage.setItem('token', signUp.token);
            localStorage.setItem('username', name);
            isAuthenticated.value = true;

            return true;
        } catch (err) {
            //handle sign up error 
            return false;
        }
    }



    return { 
        token,
        username, 
        isAuthenticated, 
        checkSession, 
        signIn, 
        signUp,
        loginMessage
    }
})
