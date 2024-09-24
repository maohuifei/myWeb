// import axios from 'axios';  
  
// export function createRequest(baseURL: string, token?: string) {  
//     const request = axios.create({  
//         baseURL:baseURL,  
//         timeout: 20000,  
//     });  
  
//     request.interceptors.request.use(  
//         (config) => {  
//             console.log("拦截器生效");
//             if (token) {  
//                 console.log("即将放进请求头token");
//                 config.headers.Authorization = `Bearer ${token}`;  
//                 console.log("已经放进请求头token");
//             }  
//             return config;  
//         },  
//         (error) => {  
//             console.log("拦截器报错");
//             return Promise.reject(error); 
//         }  
//     );  
  
//     return request;  
// }