import axios from 'axios';  
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
  
const service = axios.create({  
  baseURL: "http://111.229.189.189/api/", // API的base_url  
  timeout: 5000, // 请求超时时间  
});  
// 请求拦截器  
service.interceptors.request.use(  
  (config) => {  
      const token = localStorage.getItem('auth_token'); // 假设token存储在localStorage中  
      // 判断是否存在token，如果存在的话，则每个http header都加上token  
      if (token) {  
        config.headers['Authorization'] = `Bearer ${token}`;  
      }
      else{
        const router = useRouter();
        router.push('./login')
        ElMessage.error('认证过期，请重新登录')
      }
      return config;  
  },  
  (error) => {  
    // 对请求错误做些什么  
    console.error(error); // for debug  
    Promise.reject(error);  
  }  
);  
  
export default service;