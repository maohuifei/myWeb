/**
 * 文章详情组件
 * 展示单篇文章的完整内容，包括标题、分类、创建时间等信息
 */
<template>
    <div class="particulars_box">
        <div class="floating_back_btn">
            <button class="back_btn" @click="backBtn">返回上一页</button>
        </div>
        <h1 class="title">{{ particulars.title }}</h1>
        <div class="content_box">
            <div class="message_box">
                <span class="category">{{ particulars.category }}</span>
                <span>创建时间：{{ formatDate(particulars.created_at) }}</span>
                <span>更新时间：{{ formatDate(particulars.updated_at) }}</span>
            </div>
            <div class="abstract_box">
                <p>{{ particulars.abstract }}</p>
            </div>
            <div class="article_content">
                <div v-html="sanitizeContent(particulars.content)"></div>
            </div>
        </div>
        <div class="catalogue" v-if="tocItems.length > 0">
            <div class="toc-header" @click="toggleToc">
                <div class="toc-title">目录</div>
                <div :class="['toc-toggle', { 'expanded': tocExpanded }]">▼</div>
            </div>
            <transition name="slide-fade">
                <div class="toc-content" v-show="tocExpanded">
                    <div class="toc-items">
                        <div 
                            v-for="item in tocItems" 
                            :key="item.id"
                            :class="['toc-item', `level-${item.level}`]"
                            @click="scrollToHeading(item.id)"
                        >
                            {{ item.text }}
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { myStore } from '@/stores/counter';
import { Utils } from '@/utils';

// 文章数据接口定义
interface ArticleData {
    title: string;
    content: string;
    abstract: string;
    category: string;
    categoryId: number;
    created_at: string;
    updated_at: string;
}

// 分类数据接口
interface Category {
    id: number;
    name: string;
}

// 目录项接口
interface TocItem {
    id: string;
    level: number;
    text: string;
}

export default {
    name: 'ArticleParticulars',
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = myStore();
        const utils = new Utils();
        const tocItems = ref<TocItem[]>([]);
        const tocExpanded = ref(true);

        // 文章详情数据
        const particulars = ref<ArticleData>({
            title: '',
            content: '',
            abstract: '',
            category: '',
            categoryId: 0,
            created_at: '',
            updated_at: ''
        });

        /**
         * 获取文章分类信息
         */
        const getCategoryList = async () => {
            try {
                const response = await store.getDataToServer('categories/list', { type: "文章分类" });
                if (response.success && response.data) {
                    const categories: Category[] = response.data;
                    const matchingCategory = categories.find(category => category.id === particulars.value.categoryId);
                    if (matchingCategory) {
                        particulars.value.category = matchingCategory.name;
                    }
                } else {
                    console.error('获取分类列表失败:', response.message);
                }
            } catch (error) {
                console.error('获取分类列表出错:', error);
            }
        };

        /**
         * 生成目录
         */
        const generateToc = () => {
            // 等待DOM更新完成
            setTimeout(() => {
                const content = document.querySelector('.article_content');
                if (!content) return;

                // 查找所有标题元素
                const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
                const items: TocItem[] = [];

                headings.forEach((heading, index) => {
                    // 为每个标题生成唯一ID
                    const id = `heading-${index}`;
                    heading.setAttribute('id', id);

                    // 获取标题级别
                    const level = parseInt(heading.tagName.charAt(1));

                    items.push({
                        id,
                        level,
                        text: heading.textContent || ''
                    });
                });

                tocItems.value = items;
            }, 100);
        };

        /**
         * 跳转到指定标题
         */
        const scrollToHeading = (id: string) => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        /**
         * 获取文章详情数据
         * @param id 文章ID
         */
        const getParticulars = async (id: number) => {
            try {
                const response = await store.getDataToServer("article/content", { id });
                if (response.success) {
                    particulars.value = {
                        ...response.data,
                        category: '', // 初始化category，稍后通过getCategoryList获取
                        created_at: response.data.created_at || '',
                        updated_at: response.data.updated_at || ''
                    };
                    // 获取到文章数据后，立即获取分类信息
                    await getCategoryList();
                    // 等待内容渲染后生成目录
                    generateToc();
                } else {
                    console.error('获取文章详情失败:', response.message);
                }
            } catch (error) {
                console.error('获取文章详情出错:', error);
            }
        };

        /**
         * 格式化日期显示
         * @param dateString 日期字符串
         */
        const formatDate = (dateString: string): string => {
            if (!dateString) return '';
            return new Date(dateString).toLocaleString();
        };

        /**
         * 清理和过滤HTML内容，防止XSS攻击
         * @param content HTML内容
         */
        const sanitizeContent = (content: string): string => {
            if (!content) return '';
            
            // 提取style标签内容
            const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
            let styles = '';
            if (styleMatches) {
                styles = styleMatches.map(style => {
                    // 将样式限定在文章内容范围内
                    return style.replace(/<style[^>]*>([\s\S]*?)<\/style>/i, (match, p1) => {
                        // 给所有样式添加 .article_content 前缀
                        const scopedStyles = p1.replace(/([^{}]+){/g, '.article_content $1{');
                        return `<style>${scopedStyles}</style>`;
                    });
                }).join('');
            }
            
            // 移除原始style标签
            content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
            
            // 移除html和body标签，但保留其中的内容
            content = content.replace(/<html[^>]*>|<\/html>|<head>[\s\S]*?<\/head>|<body[^>]*>|<\/body>/gi, '');
            
            // 将处理后的样式和内容组合
            return styles + content;
        };

        /**
         * 返回上一页
         */
        const backBtn = () => {
            router.back();
        };

        // 切换目录展开状态
        const toggleToc = () => {
            tocExpanded.value = !tocExpanded.value;
        };

        // 组件挂载时获取文章数据
        onMounted(() => {
            const articleId = Number(route.query.articleId);
            if (articleId) {
                getParticulars(articleId);
            } else {
                console.error('未找到文章ID');
                router.push('/');
            }
        });

        return {
            particulars,
            backBtn,
            formatDate,
            sanitizeContent,
            tocItems,
            scrollToHeading,
            tocExpanded,
            toggleToc
        };
    }
};
</script>

<style scoped>
.particulars_box {
    max-width: 800px;  /* 减小内容区域宽度 */
    margin: 0 auto;
    padding: 20px;
    position: relative;
}

.floating_back_btn {
    position: fixed;
    top: 80px;  /* 调整这个值以适应顶栏高度 */
    left: 40px;
    z-index: 1000;
}

.back_btn {
    background-color: var(--systemColor);
    color: var(--outElementColor);
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.95em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 8px;
}

.back_btn::before {
    content: "←";
    display: inline-block;
    transition: transform 0.3s ease;
}

.back_btn:hover {
    opacity: 0.95;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateX(-5px);
}

.back_btn:hover::before {
    transform: translateX(-3px);
}

.title {
    font-weight: bold;
    font-size: 2.2em;
    margin: 30px 0;
    color: var(--systemColor);
    text-align: center;
}

.message_box {
    margin: 30px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    align-items: center;
}

.message_box span {
    margin-right: 20px;
    font-weight: 500;
    font-size: 0.9em;
    color: #666;
}

.category {
    background-color: var(--elementColor);
    color: white !important;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: bold;
}

.content {
    margin-top: 40px;
}

/* 文章内容样式隔离 */
.article_content {
    padding: 20px;
}

.article_content :deep(*) {
    max-width: 100%;
}

.abstract_box {
    padding: 25px;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    font-size: 1.1em;
    line-height: 1.8;
    color: #495057;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.abstract_box p {
    margin: 0;
    font-weight: 500;
}

.catalogue {
    position: fixed;
    right: 20px;
    top: 80px;
    width: 250px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.toc-header {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
    background-color: white;
    border-radius: 8px 8px 0 0;
}

.toc-title {
    font-size: 1.1em;
    font-weight: 600;
    color: var(--systemColor);
}

.toc-toggle {
    font-size: 0.9em;
    color: #666;
    transition: transform 0.3s ease;
}

.toc-toggle.expanded {
    transform: rotate(180deg);
}

.toc-content {
    padding: 20px;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    transition: padding 0.3s ease;
}

.toc-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.toc-item {
    cursor: pointer;
    color: #666;
    transition: all 0.2s ease;
    font-size: 0.95em;
    line-height: 1.4;
}

.toc-item:hover {
    color: var(--systemColor);
}

.level-1 { padding-left: 0; }
.level-2 { padding-left: 1em; }
.level-3 { padding-left: 2em; }
.level-4 { padding-left: 3em; }
.level-5 { padding-left: 4em; }
.level-6 { padding-left: 5em; }

/* 添加滚动条样式 */
.catalogue::-webkit-scrollbar {
    width: 4px;
}

.catalogue::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.catalogue::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;
}

.catalogue::-webkit-scrollbar-thumb:hover {
    background: #999;
}

/* 目录收放过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
    max-height: calc(100vh - 200px);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    max-height: 0;
    padding: 0;
    overflow: hidden;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
    opacity: 1;
    max-height: calc(100vh - 200px);
}
</style>