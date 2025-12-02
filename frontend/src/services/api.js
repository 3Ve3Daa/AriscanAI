import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

export const sendChatMessage = async ({ message, history }) => {
  const response = await apiClient.post('/chat', { message, history });
  return response.data;
};
