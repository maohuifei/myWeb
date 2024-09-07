import axios from 'axios'
import { defineStore } from 'pinia'


const API_URL = 'http://localhost:3000'  

export const myStore = defineStore('myStore', {
    state: () => ({
        //定义状态
        mainState: 1,//1首页 2文章 3用户 4系统：（41文章配置 42页面配置 43用户配置）
        responseData: null,
        isLoading: false,
        error: null as null | Error,
    }),
    actions: {
        //定义修改状态的方法
        updataMainStateFun(newState: number) {
            this.mainState = newState
        },
        async getDataToServer(url:string,params?:any){
            try {
                this.isLoading=true
                this.error=null
                const response=await axios.get(`${API_URL}/${url}`,{params})
                return response.data
                //this.responseData=response.data
                this.isLoading=false
            } catch (error) {
                this.error=error as Error
                this.isLoading=false
            }
        }
    },
    getters: {
        //定义计算属性
    }
})