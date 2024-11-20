import axios from 'axios';

const apiAuthenticated = (token) => {
  return axios.create({
    baseURL: 'http://localhost:8082/api',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export default apiAuthenticated;
