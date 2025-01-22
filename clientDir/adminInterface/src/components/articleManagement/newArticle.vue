<template>
    <div class="page-container">
        <div class="page-header">
            <h2 class="page-title">{{ isEdit ? '编辑' : '新建' }}文章</h2>
            <div class="header-actions">
                <button class="cancel-button" @click="cancelBtn">取消</button>
                <el-button type="black" class="save-button" @click="saveBtn">保存</el-button>
            </div>
        </div>

        <div class="article-form">
            <div class="form-header">
                <el-input 
                    v-model="articleInfo.title" 
                    placeholder="请输入标题"
                    maxlength="100"
                    show-word-limit
                />
                <el-select 
                    v-model="articleInfo.categoryId" 
                    placeholder="请选择文章类别"
                    @change="selectGroupKeyFun"
                    style="width: 200px"
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
                maxlength="200"
                show-word-limit
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
                        class="recommend-switch"
                    />
                </div>
                <div class="switch-item">
                    <span>文章状态</span>
                    <el-switch 
                        v-model="articleInfo.state" 
                        active-text="上架" 
                        inactive-text="下架" 
                        inline-prompt
                        class="state-switch"
                    />
                </div>
            </div>

            <div class="editor-container">
                <el-input
                    v-model="articleInfo.content"
                    type="textarea"
                    placeholder="请输入文章内容（支持Markdown格式）"
                    class="html-editor"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { myStore } from '@/stores'
import { ElMessage } from 'element-plus'
import http from '@/axios'

// 类型定义
interface Category {
    id: number
    name: string
}

interface ArticleInfo {
    id?: number
    title: string
    categoryId: number
    category?: string
    abstract: string
    recommend: boolean
    state: boolean
    content: string
    created_at?: Date
    updated_at?: Date
}

interface ApiResponse<T> {
    success: boolean
    data: T
    message?: string
}

// 状态定义
const store = myStore()
const loading = ref(false)
const isEdit = computed(() => !!store.articleNewOrEdit)
const options = ref<Category[]>([])

// 文章信息
const articleInfo = ref<ArticleInfo>({
    title: '',
    categoryId: 0,
    abstract: '',
    recommend: false,
    state: true,
    content: ''
})

// API 错误处理
const handleApiError = (error: any, message: string) => {
    console.error(message, error)
    ElMessage.error(message)
}

// 获取文章详情
const getArticleDetails = async (id: number) => {
    try {
        const response = await http.get<ApiResponse<ArticleInfo>>('article/content', {
            params: { id }
        })
        
        if (!response.data.success) {
            throw new Error(response.data.message || '获取文章详情失败')
        }
        
        articleInfo.value = response.data.data
    } catch (error) {
        handleApiError(error, '获取文章详情失败')
    }
}

// 获取分类列表
const getConfigurationList = async () => {
    try {
        const response = await http.get<ApiResponse<Category[]>>('categories/list', { 
            params: { type: "文章分类" } 
        })
        
        if (!response.data.success) {
            throw new Error(response.data.message || '获取分类列表失败')
        }
        
        options.value = response.data.data
    } catch (error) {
        handleApiError(error, '获取分类列表失败')
    }
}

// 表单验证
const validateForm = (): boolean => {
    if (!articleInfo.value.title.trim()) {
        ElMessage.warning('请输入文章标题')
        return false
    }
    if (!articleInfo.value.categoryId) {
        ElMessage.warning('请选择文章分类')
        return false
    }
    if (!articleInfo.value.abstract.trim()) {
        ElMessage.warning('请输入文章摘要')
        return false
    }
    if (!articleInfo.value.content.trim()) {
        ElMessage.warning('请输入文章内容')
        return false
    }
    return true
}

// 保存文章
const saveBtn = async () => {
    if (!validateForm()) return
    
    loading.value = true
    try {
        const parameter = {
            ...articleInfo.value
        }
        if (isEdit.value) {
            parameter.id = store.articleNewOrEdit
            delete parameter.created_at
            delete parameter.updated_at
        }
        
        const endpoint = isEdit.value ? 'article/put' : 'article/add'
        const method = isEdit.value ? http.put : http.post
        
        const response = await method<ApiResponse<void>>(endpoint, parameter)
        
        if (!response.data.success) {
            throw new Error(response.data.message || `${isEdit.value ? '修改' : '添加'}文章失败`)
        }
        
        ElMessage.success(`${isEdit.value ? '修改' : '添加'}文章成功`)
        setTimeout(() => store.updataMainStateFun(2), 1000)
    } catch (error) {
        handleApiError(error, `${isEdit.value ? '修改' : '添加'}文章失败`)
    } finally {
        loading.value = false
    }
}

// 取消编辑
const cancelBtn = () => store.updataMainStateFun(2)

// 分类选择处理
const selectGroupKeyFun = (value: number) => {
    if (articleInfo.value && 'category' in articleInfo.value) {
        articleInfo.value.category = options.value.find(opt => opt.id === value)?.name
    }
}

// 初始化
onMounted(async () => {
    if (store.articleNewOrEdit) {
        await getArticleDetails(store.articleNewOrEdit)
    }
    await getConfigurationList()
})
</script>

<style scoped lang="less">
.page-container {
    height: 88vh;
    display: flex;
    flex-direction: column;
    background-color: var(--el-bg-color);
    overflow: hidden;
}

.page-header {
    padding: 16px 16px 12px;
    margin: 0;
    border-bottom: 1px solid var(--el-border-color-light);
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-actions {
        display: flex;
        gap: 16px;
    }
}

.article-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px 16px 0;
    overflow: auto;
    max-height: calc(100vh - 120px);

    .form-header {
        display: flex;
        gap: 8px;
        flex-shrink: 0;

        :deep(.el-input),
        :deep(.el-select) {
            .el-input__wrapper {
                height: 32px;
            }
        }
    }

    .abstract-input {
        flex-shrink: 0;
        
        :deep(.el-textarea__wrapper) {
            padding: 4px 8px;
        }
        
        :deep(.el-textarea__inner) {
            min-height: 50px !important;
            max-height: 50px !important;
        }
    }

    .article-switches {
        flex-shrink: 0;
        display: flex;
        gap: 16px;
        padding: 4px 0;

        .switch-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }

    .editor-container {
        flex: 1;
        min-height: 100px;
        max-height: calc(100vh - 400px);
        display: flex;
        margin: 0;
        
        .html-editor {
            height: 100%;
            
            :deep(.el-textarea__inner) {
                height: 100% !important;
                resize: none;
                padding: 8px;
                border: 1px solid var(--el-border-color);
                border-radius: 4px;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .page-header {
        padding: 8px;
    }

    .article-form {
        padding: 8px 8px 0;
    }
}

// Add save button style
.save-button {
    min-width: 80px;
    height: 36px;
    padding: 0 16px;
    background-color: #000;
    border-color: #000;
    color: #fff;
    
    &:hover {
        background-color: #333;
        border-color: #333;
    }
}
</style>