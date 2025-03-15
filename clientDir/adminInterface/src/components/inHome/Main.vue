<template>
    <main class="main-content">
        <!-- 动态组件区域 -->
        <div class="content-wrapper">
            <articleManagement v-if="store.mainState === 2" />
            <newArticle v-else-if="store.mainState === 21" />
            <userManagement v-else-if="store.mainState === 3" />
            <linkManagement v-else-if="store.mainState === 5" />
            <!-- <articleSystem v-else-if="store.mainState==41"></articleSystem>
            <webSystem v-else-if="store.mainState==42"></webSystem>
            <userSystem v-else-if="store.mainState==43"></userSystem> -->
            <categoriesSystem v-else-if="store.mainState === 44" />
            
            <!-- 仪表盘 -->
            <div v-else class="dashboard-container">
                <div class="page-header">
                    <h2 class="page-title">仪表盘</h2>
                </div>
                
                <div class="dashboard" v-loading="loading">
                    <!-- 统计卡片 -->
                    <div class="stats-section">
                        <el-card class="stat-card" shadow="hover">
                            <template #header>
                                <div class="card-header">
                                    <el-icon><Document /></el-icon>
                                    <span>文章总数</span>
                                </div>
                            </template>
                            <div class="card-value">{{ stats.articleCount }}</div>
                        </el-card>
                    </div>

                    <!-- 最近文章 -->
                    <div class="articles-section">
                        <el-card class="article-card" shadow="hover">
                            <template #header>
                                <div class="card-header">
                                    <span>最近文章</span>
                                </div>
                            </template>
                            <div class="article-list">
                                <div 
                                    v-for="article in recentArticles" 
                                    :key="article.id" 
                                    class="article-item"
                                >
                                    <div class="article-title" :title="article.title">
                                        {{ article.title }}
                                    </div>
                                    <div class="article-time">
                                        {{ formatDate(article.created_at) }}
                                    </div>
                                </div>
                                <div v-if="recentArticles.length === 0" class="empty-state">
                                    暂无文章
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Document } from '@element-plus/icons-vue'
import { myStore } from '@/stores'
import http from '@/axios'

// 组件导入
import articleManagement from '../articleManagement/index.vue'
import userManagement from '../userManagement/index.vue'
import linkManagement from '../linkManagement/index.vue'
// import articleSystem from '../systemManagement/articleSystem.vue';
// import userSystem from '../systemManagement/userSystem.vue';
// import webSystem from '../systemManagement/webSystem.vue';
import newArticle from '../articleManagement/newArticle.vue'
import categoriesSystem from '../systemManagement/categoriesSystem.vue'

// 类型定义
interface Article {
    id: number
    title: string
    content: string
    abstract: string
    category: string
    state: boolean
    created_at: string
    updated_at: string
}

interface DashboardStats {
    articleCount: number
}

interface ApiResponse<T> {
    success: boolean
    data: T
    totalCount?: number
    message?: string
}

// 状态管理
const store = myStore()
const stats = ref<DashboardStats>({
    articleCount: 0
})
const recentArticles = ref<Article[]>([])
const loading = ref(false)

// 获取仪表盘数据
const fetchDashboardData = async () => {
    loading.value = true
    try {
        const response = await http.get<ApiResponse<Article[]>>('article/list', {
            params: {
                page: 1,
                pageSize: 10
            }
        })
        
        if (!response.data?.success) {
            throw new Error(response.data.message || '获取数据失败')
        }
        
        const articles = response.data.data
        stats.value.articleCount = response.data.totalCount || articles.length
        recentArticles.value = articles
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 5)
    } catch (error) {
        console.error('获取仪表盘数据失败:', error)
    } finally {
        loading.value = false
    }
}

// 格式化日期
const formatDate = (dateStr: string) => {
    try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    } catch {
        return dateStr
    }
}

// 初始化
onMounted(() => {
    fetchDashboardData()
})
</script>

<style lang="less" scoped>
.main-content {
    width: 100%;
    height: 100%;
    background-color: var(--el-bg-color);
    
    .content-wrapper {
        height: 100%;
    }
}

.dashboard-container {
    padding: 20px;
    
    .page-header {
        margin-bottom: 24px;
        
        .page-title {
            margin: 0;
            font-size: 1.5em;
            color: var(--el-text-color-primary);
        }
    }
}

.dashboard {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    
    .stats-section {
        .stat-card {
            transition: transform 0.3s ease;
            
            &:hover {
                transform: translateY(-2px);
            }
            
            .card-header {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--el-text-color-primary);
                
                .el-icon {
                    font-size: 18px;
                }
            }
            
            .card-value {
                font-size: 36px;
                font-weight: 600;
                color: var(--el-text-color-primary);
                text-align: center;
                padding: 24px 0;
            }
        }
    }
    
    .articles-section {
        .article-card {
            height: 100%;
            transition: transform 0.3s ease;
            
            &:hover {
                transform: translateY(-2px);
            }
            
            .article-list {
                padding: 12px 0;
                
                .article-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 20px;
                    transition: all 0.3s ease;
                    border-radius: 4px;
                    
                    &:hover {
                        background-color: var(--el-fill-color-light);
                    }
                    
                    .article-title {
                        flex: 1;
                        font-size: 14px;
                        color: var(--el-text-color-primary);
                        margin-right: 16px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    
                    .article-time {
                        font-size: 13px;
                        color: var(--el-text-color-secondary);
                        flex-shrink: 0;
                    }
                }
                
                .empty-state {
                    text-align: center;
                    padding: 24px;
                    color: var(--el-text-color-secondary);
                    font-size: 14px;
                }
            }
        }
    }
}

// 响应式设计
@media screen and (max-width: 768px) {
    .dashboard-container {
        padding: 16px;
    }
    
    .dashboard {
        gap: 16px;
        grid-template-columns: 1fr;
        
        .stats-section {
            .stat-card {
                .card-value {
                    font-size: 28px;
                    padding: 16px 0;
                }
            }
        }
        
        .articles-section {
            .article-card {
                .article-list {
                    .article-item {
                        padding: 10px 16px;
                        
                        .article-title {
                            font-size: 13px;
                        }
                        
                        .article-time {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>