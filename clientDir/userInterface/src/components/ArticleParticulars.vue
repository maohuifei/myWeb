/**
 * 文章详情组件
 * 展示单篇文章的完整内容，包括标题、分类、创建时间等信息
 */
<template>
    <div class="particulars_box">
        <div class="back_btn_box">
            <button class="back_btn" @click="backBtn">返回上一页</button>
        </div>
        <h1 class="title">{{ particulars.title }}</h1>
        <div class="content_box">
            <div class="message_box">
                <span class="category">{{ particulars.category }}</span>
                <span>创建时间：{{ formatDate(particulars.created_at) }}</span>
                <span>更新时间：{{ formatDate(particulars.updated_at) }}</span>
            </div>
            <!-- 使用v-html需要确保content内容是安全的，已经过XSS过滤 -->
            <div class="content" v-html="sanitizeContent(particulars.content)"></div>
            <div class="catalogue">
                <!-- 目录结构预留位置 -->
            </div>
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

export default {
    name: 'ArticleParticulars',
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = myStore();
        const utils = new Utils();

        // 文章详情数据
        const particulars = ref<ArticleData>({
            title: '',
            content: '',
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
            // 这里可以添加XSS过滤逻辑
            return content;
        };

        /**
         * 返回上一页
         */
        const backBtn = () => {
            router.back();
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
            sanitizeContent
        };
    }
};
</script>

<style scoped lang="less">
.particulars_box {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;

    .back_btn_box {
        text-align: left;
        margin: 20px 0;
        
        .back_btn {
            background-color: var(--systemColor);
            color: var(--outElementColor);
            padding: 8px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95em;
            
            &:hover {
                opacity: 0.9;
                transform: translateX(-5px);
            }
        }
    }

    .title {
        font-weight: bold;
        font-size: 2.2em;
        margin: 30px 0;
        color: var(--systemColor);
        text-align: center;
    }

    .content_box {
        .message_box {
            margin: 30px 0;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
            align-items: center;

            span {
                margin-right: 20px;
                font-weight: 500;
                font-size: 0.9em;
                color: #666;
            }

            .category {
                background-color: var(--elementColor);
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
            }
        }

        .content {
            line-height: 1.8;
            font-size: 1.1em;
            color: #333;
            margin-top: 40px;

            h1, h2, h3, h4, h5, h6 {
                color: var(--systemColor);
                margin: 25px 0 15px 0;
            }

            p {
                margin: 15px 0;
            }

            img {
                max-width: 100%;
                height: auto;
                margin: 20px 0;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }

            pre {
                background: #f5f5f5;
                padding: 15px;
                border-radius: 8px;
                overflow-x: auto;
                margin: 20px 0;
            }

            blockquote {
                border-left: 4px solid var(--systemColor);
                padding-left: 20px;
                margin: 20px 0;
                font-style: italic;
                color: #666;
            }

            ul, ol {
                padding-left: 20px;
                margin: 15px 0;
            }

            a {
                color: var(--systemColor);
                text-decoration: none;
                border-bottom: 1px solid transparent;
                transition: all 0.3s ease;

                &:hover {
                    border-bottom-color: var(--systemColor);
                }
            }
        }
    }
}
</style>