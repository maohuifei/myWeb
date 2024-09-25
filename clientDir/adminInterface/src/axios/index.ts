import axios from 'axios';  
  
const service = axios.create({  
  baseURL: "http://localhost:3000/", // API的base_url  
  timeout: 5000, // 请求超时时间  
});  
  
// 请求拦截器  
service.interceptors.request.use(  
  (config) => {  
    // 判断是否存在token，如果存在的话，则每个http header都加上token  
    const token = localStorage.getItem('token'); // 假设token存储在localStorage中  
    if (token) {  
      config.headers['Authorization'] = `Bearer ${token}`;  
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
// import axios from 'axios';  
  
// export function createRequest() {  
//     const request = axios.create({  
//         baseURL:"http://locahost/3000",  
//         timeout: 20000,  
//     });  
  
//     request.interceptors.request.use(  
//         (config) => {  
//             const token =localStorage.getItem('userToken');
//             if (token) {  
//                 config.headers.Authorization = `Bearer ${token}`;  
//             }  
//             return config;  
//         },  
//         (error) => {  
//             // console.log("拦截器报错");
//             return Promise.reject(error); 
//         }  
//     );  
  
//     return request;  
// }