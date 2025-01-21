import axios from 'axios';  
import { ElMessage } from 'element-plus';
import router from '@/router';
import { myStore } from '@/stores';
  
const stores = myStore()

const service = axios.create({
  baseURL: stores.API_URL,
  timeout: 5000
});

// 请求拦截器  
service.interceptors.request.use(  
  (config) => {  
    const token = localStorage.getItem('auth_token');
    if (token) {  
      config.headers['Authorization'] = `Bearer ${token}`;  
    } else {
      router.push('/login')
      ElMessage.error('认证过期，请重新登录')
    }
    return config;  
  },  
  error => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401 || status === 405) {
      ElMessage.error('登录已过期，请重新登录')
      localStorage.removeItem('auth_token')
      setTimeout(() => router.push('/login'), 1500)
    } else {
      ElMessage.error(error.response?.data || '请求失败，请稍后重试')
    }

    return Promise.reject(error);
  }
);
  
export default service;