import { defineStore } from 'pinia'
// import { createRequest } from '@/axios'

export const myStore = defineStore('myStore', {
    state: () => ({
        //定义状态
        mainState: 1,//1首页 2文章 3用户 4系统：（41文章配置 42页面配置 43用户配置）
        articleNewOrEdit: 0,//新建文章：0，编辑文章：id
        responseData: null,
        token: "",
        //生产环境
        // API_URL: "https://huafeng.website/api",
        // 测试环境
        API_URL: 'http://localhost:3000/api', 
    }),
    actions: {
        //定义修改状态的方法
        updataMainStateFun(newState: number) {
            this.mainState = newState
        },
    },
    getters: {
        //定义计算属性
    }
})