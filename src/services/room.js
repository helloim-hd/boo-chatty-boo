import axios from 'axios';

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

const getHistoryByRoom = async (room) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND}/history?room=${room}`;
    const result = await axios.get(url);
    return result.data.history;
  } catch (error) {
    console.log(error);
  }
};

const saveMessage = async (data) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND}/message`;
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
  getHistoryByRoom,
  saveMessage,
  getUserColour,
  createRoom
};
