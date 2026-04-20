import { defineStore } from 'pinia';
import { ref } from 'vue';
import auth from '../services/auth.js';

export const useAuthStore = defineStore('auth', () => {
    const userName = ref('');
    const loginMessage = ref('');
    const token = ref(localStorage.getItem('token') || null);
    const isAuthenticated = ref(null);

    const checkSession = async () => {
        try {
            console.log(token.value)
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
            localStorage.setItem('token', signIn.token);

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
            localStorage.setItem('token', signUp.token);

        } catch (err) {
            //handle sign up error 
        }
    }



    return { 
        userName, 
        isAuthenticated, 
        checkSession, 
        signIn, 
        loginMessage 
    }
})
