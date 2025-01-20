<template>
    <div class="page-container">
        <div class="page-header">
            <h2 class="page-title">文章管理</h2>
            <el-button type="primary" :icon="Plus" @click="viewArticle()">新建文章</el-button>
        </div>

        <div class="page-content">
            <el-table 
                :data="tableData" 
                height="530" 
                v-loading="loading"
                :style="{ width: '100%' }"
                class="table-container"
            >
                <el-table-column prop="title" label="标题" min-width="100" show-overflow-tooltip />
                <el-table-column prop="category" label="类别" width="80" />
                <el-table-column label="状态" width="60" align="center">
                    <template #default="{ row }">
                        <el-tag :type="row.state ? 'success' : 'danger'" size="small">
                            {{ row.state ? '上架' : '下架' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="推荐" width="60" align="center">
                    <template #default="{ row }">
                        <el-tag :type="row.recommend ? 'warning' : 'info'" size="small">
                            {{ row.recommend ? '推荐' : '常规' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260" align="center">
                    <template #default="{ row }">
                        <div class="operation-column">
                            <el-button-group>
                                <el-button 
                                    :type="row.recommend ? 'warning' : 'info'"
                                    :icon="Star"
                                    size="small"
                                    @click="recommendBtn(row)"
                                >
                                    {{ row.recommend ? '取消' : '推荐' }}
                                </el-button>
                                <el-button 
                                    :type="row.state ? 'success' : 'danger'"
                                    :icon="row.state ? 'Hide' : 'View'"
                                    size="small"
                                    @click="stateBtn(row)"
                                >
                                    {{ row.state ? '下架' : '上架' }}
                                </el-button>
                                <el-button 
                                    type="primary" 
                                    :icon="Edit"
                                    size="small"
                                    @click="viewArticle(row)"
                                >
                                    编辑
                                </el-button>
                                <el-button 
                                    type="danger" 
                                    :icon="Delete"
                                    size="small"
                                    @click="deleBtn(row)"
                                >
                                    删除
                                </el-button>
                            </el-button-group>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页器 -->
            <div class="table-pagination">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="parameter.page"
                    :page-size="parameter.pageSize"
                    layout="total, prev, pager, next"
                    :total="totalCount"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Edit, Delete, Star, View, Hide } from '@element-plus/icons-vue';
import { myStore } from '@/stores';
import http from '@/axios';

// 类型定义
interface Category {
    id: number;
    name: string;
}

interface Article {
    id: number;
    title: string;
    categoryId: number;
    category?: string;
    state: boolean;
    recommend: boolean;
}

interface PaginationParams {
    page: number;
    pageSize: number;
}

// 状态定义
const store = myStore();
const loading = ref(false);
const tableData = ref<Article[]>([]);
const articleList = ref<Article[]>([]);
const categoryList = ref<Category[]>([]);
const parameter = ref<PaginationParams>({
    page: 1,
    pageSize: 10
});
const totalCount = ref(0);

// 获取文章列表
const getActive = async () => {
    loading.value = true;
    try {
        const response = await http.get('article/list', {
            params: parameter.value
        });
        articleList.value = response.data.data;
        totalCount.value = response.data.totalCount;
        await getCategoryList();
    } catch (error) {
        ElMessage.error('获取文章列表失败');
    } finally {
        loading.value = false;
    }
};

// 获取文章分类列表
const getCategoryList = async () => {
    try {
        const response = await http.get('categories/list', { 
            params: { type: "文章分类" } 
        });
        categoryList.value = response.data.data;
        updateCategoryNames();
    } catch (error) {
        ElMessage.error('获取分类列表失败');
    }
};

// 更新文章列表中的分类名称
const updateCategoryNames = () => {
    tableData.value = articleList.value.map(article => ({
        ...article,
        category: categoryList.value.find(cat => cat.id === article.categoryId)?.name || '未分类'
    }));
};

// 跳转到文章编辑页面
const viewArticle = (article?: Article) => {
    store.articleNewOrEdit = article ? article.id : 0;
    store.updataMainStateFun(21);
};

// 删除文章
const deleBtn = async (article: Article) => {
    try {
        await ElMessageBox.confirm(
            `确定要删除文章"${article.title}"吗？`,
            '警告',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        );
        
        await http.delete(`article/delete/${article.id}`);
        ElMessage.success('删除文章成功');
        getActive();
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error('删除文章失败');
        }
    }
};

// 切换文章状态（上架/下架）
const stateBtn = async (article: Article) => {
    try {
        await http.put('article/put', {
            id: article.id,
            state: !article.state
        });
        ElMessage.success('修改状态成功');
        getActive();
    } catch (error) {
        ElMessage.error('修改状态失败');
    }
};

// 切换文章推荐状态
const recommendBtn = async (article: Article) => {
    try {
        await http.put('article/put', {
            id: article.id,
            recommend: !article.recommend
        });
        ElMessage.success('修改推荐状态成功');
        getActive();
    } catch (error) {
        ElMessage.error('修改推荐状态失败');
    }
};

// 分页切换
const handleCurrentChange = (page: number) => {
    parameter.value.page = page;
    getActive();
};

// 初始化
onMounted(() => {
    getActive();
});
</script>

<style scoped lang="less">
:deep(.el-tag) {
    width: 45px;
    text-align: center;
    padding: 0 4px;
}

:deep(.el-button-group) {
    white-space: nowrap;
    display: flex;
    
    .el-button {
        margin-left: -1px !important;
        padding: 5px 8px;
        
        .el-icon {
            margin-right: 2px;
        }
    }
}

.operation-column {
    padding-right: 16px;
}
</style>