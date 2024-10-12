<!-- 主页 -->
<template>
    <Aside></Aside> 
    <div class="home_box">
        <Header></Header>
        <Main></Main>
    </div>
</template>

<script lang="ts">  
import Aside from '@/components/inHome/Aside.vue';  
import Header from '@/components/inHome/Header.vue';  
import Main from '@/components/inHome/Main.vue';  
import { defineComponent,onMounted } from 'vue';  
import { useRouter } from 'vue-router';  
  
export default defineComponent({ // 使用 defineComponent 来定义组件  
  name: 'Home',
  components: {  
    Aside,  
    Header,  
    Main  
  },  
  setup() {  
    onMounted(() => {  
      const router = useRouter();  
      const token = localStorage.getItem('auth_token'); // 在这里添加了分号，尽管它不是必需的  
  
      if (!token) {  
        router.push({ name: 'login' }); // 跳转到登录页面  
      }  
    });  
  
    return {}; // 这里通常可以返回一些在模板中使用的响应式数据或函数  
  }  
});  
</script>

<style lang="less">
.home_box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>