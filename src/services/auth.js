import axios from 'axios';

const getSession = async (token) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND}/api/users/session`;
    const result = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return result.data;
  } catch (error) {
    throwErrorMessage(error);
  }
};


const signUp = async (name, password) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND}/api/users/signup`;
    const result = await axios.post(url, {name, password});
    return result.data;
  } catch (error) {
    throwErrorMessage(error);
  }
};

const signIn = async (name, password) => {
  try {
    const url = `${import.meta.env.VITE_CHAT_BACKEND}/api/users/signin`;
    const result = await axios.post(url, {name, password});
    return result.data;
  } catch (error) {
    throwErrorMessage(error);
  }
};

const throwErrorMessage = error => {
  let errMessage = error.message;
  if (error.response.data) {
    errMessage = error.response.data.message;
  }
  console.log("throwing error ", errMessage)
  throw new Error(errMessage);
}


export default {
  getSession,
  signUp,
  signIn
};
