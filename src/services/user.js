import axios from 'axios';

const getUsers = async (token) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND_URL}/users`;
    const result = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};


export default {
  getUsers,
};
