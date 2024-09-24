import axios from 'axios'
import { defineStore } from 'pinia'
// import { createRequest } from '@/axios'

export const myStore = defineStore('myStore', {
    state: () => ({
        //定义状态
        mainState: 1,//1首页 2文章 3用户 4系统：（41文章配置 42页面配置 43用户配置）
        articleNewOrEdit: 0,//新建文章：0，编辑文章：id
        responseData: null,
        token: "",
        API_URL: 'http://localhost:3000'
    }),
    actions: {
        //定义修改状态的方法
        updataMainStateFun(newState: number) {
            this.mainState = newState
        },
        async getDataToServer(url: string, params?: any) {
            const response = await axios.get(`${this.API_URL}/${url}`, { params })
            return response.data
        },
        async postDataToServer(url: string, body: any) {
            const response = await axios.post(`${this.API_URL}/${url}`, body)
            return response.data
        },
        async putDataToServer(url: string, body: any) {
            const response = await axios.put(`${this.API_URL}/${url}`, body)
            return response.data
        },
        async delDataToServer(url: string, value: any) {
            const response = await axios.delete(`${this.API_URL}/${url}/${value}`)
            return response.data
        }
    },
    getters: {
        //定义计算属性
    }
})