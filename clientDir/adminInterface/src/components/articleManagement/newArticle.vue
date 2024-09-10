<template>
    <el-input v-model="articleInfo.title" />
    <!-- <el-input v-model="articleInfo.category" /> -->
    <el-select v-model="articleInfo.category" placeholder="请选择文章类别" size="large" @change="selectGroupKeyFun">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name" />
    </el-select>
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

export default {
    components: { Editor, Toolbar },
    setup() {
        const store = myStore()
        const articleInfo = ref({
            title: "请输入标题",
            category: "",
            content: ""
        })
        // const content=ref("")
        onMounted(async () => {
            if (store.articleNewOrEdit) {
                const parameter = {
                    id: store.articleNewOrEdit
                }
                try {
                    const getData = await store.getDataToServer('article/content', parameter)
                    articleInfo.value.content = getData.data.content
                    articleInfo.value.title = getData.data.title
                    articleInfo.value.category = getData.data.category
                } catch (error) {
                    ElMessage.error('获取文章失败')
                }

            }
            getConfigurationList()
        })
        const options=ref()
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
                const parameter = {
                    id: store.articleNewOrEdit,
                    title: articleInfo.value.title,
                    content: articleInfo.value.content,
                    category: articleInfo.value.category
                }
                try {
                    await store.putDataToServer('article/put', parameter)
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
                const parameter = {
                    title: articleInfo.value.title,
                    content: articleInfo.value.content,
                    category: articleInfo.value.category
                }
                try {
                    await store.addDataToServer('article/add', parameter)
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
        const selectGroupKeyFun=(value:any)=>{
            articleInfo.value.category=value
        }
        const getConfigurationList = async () => {
            const response = await store.getDataToServer('configuration/list', {type:"article_category"})
            options.value=response.data
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