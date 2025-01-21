<template>
    <div class="page-container">
        <div class="page-header">
            <h2 class="page-title">{{ isEdit ? '编辑文章' : '新建文章' }}</h2>
            <div class="header-actions">
                <el-button @click="cancelBtn">取消</el-button>
                <el-button type="primary" @click="saveBtn">保存</el-button>
            </div>
        </div>

        <div class="page-content">
            <div class="article-form">
                <div class="form-header">
                    <el-input 
                        v-model="articleInfo.title" 
                        placeholder="请输入标题" 
                        class="title-input"
                    />
                    <el-select 
                        v-model="articleInfo.categoryId" 
                        placeholder="请选择文章类别" 
                        style="width: 240px" 
                        @change="selectGroupKeyFun"
                    >
                        <el-option 
                            v-for="item in options" 
                            :key="item.id" 
                            :label="item.name" 
                            :value="item.id" 
                        />
                    </el-select>
                </div>

                <el-input 
                    v-model="articleInfo.abstract" 
                    type="textarea" 
                    placeholder="请输入摘要"
                    :rows="3"
                    class="abstract-input"
                />

                <div class="article-switches">
                    <div class="switch-item">
                        <span>推荐文章</span>
                        <el-switch 
                            v-model="articleInfo.recommend" 
                            active-text="推荐" 
                            inactive-text="常规" 
                            inline-prompt 
                        />
                    </div>
                    <div class="switch-item">
                        <span>文章状态</span>
                        <el-switch 
                            v-model="articleInfo.state" 
                            active-text="上架" 
                            inactive-text="下架" 
                            inline-prompt 
                        />
                    </div>
                </div>

                <div class="editor-container">
                    <el-input
                        v-model="articleInfo.content"
                        type="textarea"
                        placeholder="请输入 HTML 内容..."
                        class="html-editor"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, computed, onMounted } from 'vue'
import { myStore } from '@/stores'
import { ElMessage } from 'element-plus'
import http from '@/axios'

const store = myStore()
const isEdit = computed(() => store.articleNewOrEdit !== 0)

const articleInfo = ref({
    title: '',
    categoryId: '',
    abstract: '',
    recommend: false,
    state: true,
    content: ''
})

onMounted(async () => {
    if (store.articleNewOrEdit) {
        try {
            const { data } = await http.get('article/content', {
                params: { id: store.articleNewOrEdit }
            })
            articleInfo.value = data.data
        } catch {
            // 错误已在拦截器中处理
        }
    }
    getConfigurationList()
})

const options = ref()

const cancelBtn = () => {
    store.updataMainStateFun(2)
}

const saveBtn = async () => {
    const parameter = { 
        ...articleInfo.value,
        created_at: undefined,
        updated_at: undefined
    }

    try {
        if (store.articleNewOrEdit) {
            await http.put('article/put', parameter)
            ElMessage.success('修改文章成功')
        } else {
            await http.post('article/add', parameter)
            ElMessage.success('添加文章成功')
        }
        setTimeout(() => store.updataMainStateFun(2), 1000)
    } catch {
        // 错误已在拦截器中处理
    }
}

const selectGroupKeyFun = (value: any) => {
    if (articleInfo.value && 'category' in articleInfo.value) {
        articleInfo.value.category = value
    }
}

const getConfigurationList = async () => {
    try {
        const { data } = await http.get('categories/list', { 
            params: { type: "文章分类" } 
        })
        options.value = data.data
    } catch {
        // 错误已在拦截器中处理
    }
}
</script>

<style scoped>
.page-container {
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.page-title {
    margin: 0;
    font-size: 24px;
}

.page-content {
    display: flex;
    flex-direction: column;
}

.article-form {
    background: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
}

.form-header {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
}

.title-input {
    flex: 1;
}

.abstract-input {
    margin-bottom: 12px;
}

.article-switches {
    display: flex;
    gap: 32px;
    margin-bottom: 12px;
}

.switch-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.editor-container {
    height: calc(100vh - 334px);
    min-height: 0;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    display: flex;
}

.html-editor {
    font-family: monospace;
    width: 100%;
}

:deep(.el-textarea__inner) {
    height: 100% !important;
    resize: none;
}
</style>