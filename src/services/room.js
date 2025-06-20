import axios from 'axios';

const getRoomsByName = async (token) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND_URL}/room`;
    const result = await axios.get(url, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getHistoryByRoom = async (room) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND_URL}/history?room=${room}`;
    const result = await axios.get(url);
    return result.data.history;
  } catch (error) {
    console.log(error);
  }
};

const saveMessage = async (data) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND_URL}/message`;
    const result = await axios.post(url, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getRoomsByName,
  getHistoryByRoom,
  saveMessage,
};
