import axios from 'axios';  
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { myStore } from '@/stores';
  
const stores=myStore()
const router = useRouter();

const service = axios.create({
  baseURL: stores.API_URL,
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
        router.push('./login')
        ElMessage.error('认证过期，请重新登录')
      }
      return config;  
  },  
  (error) => {  
    // 对请求错误做些什么  
    console.log("请求拦截器报错",error); // for debug  
    // Promise.reject(error);  
  }  
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response; // 返回数据部分
  },
  (error) => {
    // 对响应错误做些什么
    console.log("响应拦截器报错", error); // for debug
    const status = error.response ? error.response.status : null;

    // 根据不同的状态码进行不同的处理
    if (status === 401) {
      ElMessage.error(error.response.data);
      router.push('./login'); // 跳转到登录页面
    } else if (status === 404) {
      ElMessage.error(error.response.data);
    } else if (status === 405) {
      ElMessage.error(error.response.data);
      router.push('./login'); // 跳转到登录页面
    } else {
      ElMessage.error(error.response.data);
    }

    return Promise.reject(error); // 继续抛出错误
  }
);

  
export default service;