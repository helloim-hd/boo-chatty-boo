import * as Ably from 'ably';

const connectToAbly = (name) => {
  return new Ably.Realtime({
    authUrl: `${import.meta.env.VITE_CHAT_BACKEND_URL}/chat?name=${name}`,
  });
};

export default {
  connectToAbly,
};
