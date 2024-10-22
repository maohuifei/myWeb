import axios from 'axios'
import { defineStore } from 'pinia'

// const API_URL = 'http://111.229.189.189/api'
const API_URL = 'http://localhost:3000/api'

export const myStore = defineStore('myStore', {
    state: () => ({
        //定义状态
    }),
    actions: {
        async getDataToServer(url: string, params?: any) {
            const response = await axios.get(`${API_URL}/${url}`, { params })
            return response.data
        },
        async addDataToServer(url: string, body: any) {
            const response = await axios.post(`${API_URL}/${url}`, body)
            return response.data
        },
        async putDataToServer(url: string, body: any) {
            const response = await axios.put(`${API_URL}/${url}`, body)
            return response.data
        },
        async delDataToServer(url: string, value: any) {
            const response = await axios.delete(`${API_URL}/${url}/${value}`)
            return response.data
        }
    },
    getters: {
        //定义计算属性
    }
})