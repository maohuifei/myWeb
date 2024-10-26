<template>
    <el-input v-model="articleInfo.title" placeholder="请输入标题" />
    <el-select v-model="articleInfo.categoryId" placeholder="请选择文章类别" style="width: 240px" @change="selectGroupKeyFun">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-input v-model="articleInfo.abstract" type="textarea" placeholder="请输入摘要" />
    <span>推荐文章</span>
    <el-switch v-model="articleInfo.recommend" active-text="推荐" inactive-text="常规" inline-prompt />
    <span>文章状态</span>
    <el-switch v-model="articleInfo.state" active-text="上架" inactive-text="下架" inline-prompt />
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="mode" />
        <Editor style="height: 400px; overflow-y: hidden;" v-model="articleInfo.content" :defaultConfig="editorConfig"
            :mode="mode" @onCreated="handleCreated" />
    </div>
    <el-button type="info" @click="cancelBtn">取消</el-button>
    <el-button type="success" @click="saveBtn">保存</el-button>
</template>

<script lang='ts'>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { myStore } from '@/stores';
import { ElMessage } from 'element-plus'
import http from '@/axios'

export default {
    components: { Editor, Toolbar },
    setup() {
        const store = myStore()
        const articleInfo = ref({
            title: '',
            categoryId:'',
            abstract:'',
            recommend:false,
            state:false,
            content:''
        })
        onMounted(async () => {
            if (store.articleNewOrEdit) {
                const parameter = {
                    id: store.articleNewOrEdit
                }
                try {
                    const getData = await http.get('article/content', {
                        params: parameter
                    })
                    articleInfo.value = getData.data.data
                    console.log(articleInfo.value);

                } catch (error) {
                    ElMessage.error('获取文章失败')
                }

            }
            getConfigurationList()
        })
        const options = ref()
        const editorRef = shallowRef()
        const toolbarConfig = {}
        const editorConfig = { placeholder: '胸藏万卷凭吞吐，笔有千钧任翕张' }

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })

        const handleCreated = (editor: any) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }
        const cancelBtn = () => {
            store.updataMainStateFun(2)
        }
        const saveBtn = async () => {
            if (store.articleNewOrEdit) {
                //修改
                const parameter = articleInfo.value
                if (articleInfo.value && 'created_at' in articleInfo.value) {
                    delete articleInfo.value.created_at;
                }
                if (articleInfo.value && 'updated_at' in articleInfo.value) {
                    delete articleInfo.value.updated_at;
                }
                try {
                    await http.put('article/put', parameter)
                    ElMessage({
                        message: '修改文章成功',
                        type: 'success',
                    })
                    setTimeout(() => {
                        store.updataMainStateFun(2)
                    }, 1000)

                } catch (error) {
                    ElMessage.error('修改文章失败')
                }

            } else {
                //新建
                const parameter = articleInfo.value
                if (articleInfo.value && 'created_at' in articleInfo.value) {
                    delete articleInfo.value.created_at;
                }
                if (articleInfo.value && 'updated_at' in articleInfo.value) {
                    delete articleInfo.value.updated_at;
                }
                try {
                    await http.post('article/add', parameter)
                    setTimeout(() => {
                        store.updataMainStateFun(2)
                    }, 1000)
                    ElMessage({
                        message: '添加文章成功',
                        type: 'success',
                    })
                } catch (error) {
                    ElMessage.error('添加文章失败')
                }

            }
        }
        const selectGroupKeyFun = (value: any) => {
            if (articleInfo.value && 'category' in articleInfo.value) {
                articleInfo.value.category = value
            }
        }
        const getConfigurationList = async () => {
            const response = await http.get('categories/list', { params: { type: "文章分类" } })
            options.value = response.data.data
        }
        return {
            // content,
            articleInfo,
            editorRef,
            mode: 'default', // 或 'simple'
            toolbarConfig,
            editorConfig,
            handleCreated,
            cancelBtn,
            saveBtn,
            selectGroupKeyFun,
            getConfigurationList,
            options,
        }
    }
}
</script>

<style scoped></style>