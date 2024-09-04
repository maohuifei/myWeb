import { defineStore } from 'pinia'

export const myStore = defineStore('myStore', {
    state: () => ({
        //定义状态
        mainState:1,//1首页 2文章 3用户 4系统：（41文章配置 42页面配置 43用户配置）
    }),
    actions: {
        //定义修改状态的方法
        updataMainStateFun(newState:number){
            this.mainState=newState
        }
    },
    getters: {
        //定义计算属性
    }
})