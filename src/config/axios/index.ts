import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default axiosInstance;
export * from 'axios';

