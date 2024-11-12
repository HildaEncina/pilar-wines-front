import axios from 'axios';

const apiAuthenticated = (token) => {
  return axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
      'X-Custom-Header': 'foobar',
      'Authorization': `Bearer ${token}`
    }
  });
};

export default apiAuthenticated;