import axios from 'axios';  
import { myStore } from '@/stores';
  
const stores=myStore()
const service = axios.create({
  baseURL: stores.API_URL,
  timeout: 5000, // 请求超时时间  
});
  
export default service;