<template>
    <div>
            <h1>网站配置</h1>
            <h2>logo</h2>
            <el-image style="width: 100px; height: 100px"
                :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'" />
            <h2>标题</h2>
            <el-input v-model="textarea" placeholder="Please input" />
            <h2>描述</h2>
            <el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
            <h2>底部声明</h2>
            <el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
            <h2>隐私政策</h2>
            <el-input v-model="textarea" :rows="4" type="textarea" placeholder="Please input" />
    </div>
</template>

<script lang="ts">
export default {
    setup() {
        const textarea = "我会网站描述"
        return {
            textarea,
        }
    }
}
</script>