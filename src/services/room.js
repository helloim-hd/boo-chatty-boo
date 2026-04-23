import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const getRoomsByName = async (token) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND}/api/rooms`;
    const result = await axios.get(url, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getMessagesByRoom = async (room) => {
  try {
    const authStore = useAuthStore();
    const url = `${import.meta.env.VITE_CHAT_BACKEND}/api/messages?room=${room}`;
    const result = await axios.get(url, 
      {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        }
      });
    return result.data.data.history;
  } catch (error) {
    console.log(error);
  }
};

const saveMessage = async (data) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND}/api/messages`;
    const result = await axios.post(url, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserColour = async (name) => {
  const url = `${import.meta.env.VITE_CHAT_BACKEND}/user-colour?name=${name}`;
  const result = await axios.get(url);
  return result.data;
}

const createRoom = async (data) => {
  const url = `${import.meta.env.VITE_CHAT_BACKEND}/api/rooms`;
  const result = await axios.post(url, data);
  return result.data;
}

export default {
  getRoomsByName,
  getMessagesByRoom,
  saveMessage,
  getUserColour,
  createRoom
};
