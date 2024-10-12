import axios from 'axios';  
  
const service = axios.create({  
  baseURL: "http://111.229.189.189/api/", // API的base_url  
  timeout: 5000, // 请求超时时间  
});  
  
export default service;