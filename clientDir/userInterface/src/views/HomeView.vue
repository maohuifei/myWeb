<template>
    <div class="home_box">
        <div class="left_box">
            <h1>左边</h1>
        </div>
        <div class="middle_box">
            <div class="card_class" v-for="(article, index) in articleList" key="index">
                <h2>{{ article.title }}</h2>
                <span>更新时间：{{ article.updated_at }}</span>
                <p class="abstract_box">{{ article.abstract || "此处为摘要" }}</p>
                <el-button class="all_btn" color="#a0997c" :bg="false" style="color: white;"
                    @click="ToParticulars(article.id)">阅读</el-button>
            </div>
        </div>
        <div class="right_box">
            <h1>右边</h1>
        </div>
    </div>
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue';
import { myStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import { Utils } from '@/utils';
import { ElMessage } from 'element-plus';

export default {
    setup() {
        const stores = myStore()
        const pageQuery = ref({
            page: 1,
            pageSize: 10,
            // recommend:true
        })
        const articleList = ref()
        onMounted(async () => {
            getArticleList()
        })
        const utils = new Utils()
        const getArticleList = async () => {
            try {
                const returned = await stores.getDataToServer('article/list', pageQuery.value)

                // 假设 returned.data 是一个包含多个对象的数组，每个对象都有一个 updated_at 字段  
                const articles = returned.data;

                // 使用 map 方法来遍历数组并格式化每个对象的 updated_at 字段  
                const formattedArticles = articles.map((article: { updated_at: string; }) => ({
                    ...article, // 复制文章对象的所有属性  
                    updated_at: utils.formatDate(article.updated_at) // 使用 Utils 类的 formatDate 方法来格式化 updated_at 字段  
                }));

                // 现在 formattedArticles 包含了格式化后的文章数据  
                // 你可以将 formattedArticles 赋值给某个响应式引用或用于其他目的  
                articleList.value = formattedArticles; // 假设 articleList 是一个响应式引用  

            } catch (error) {
                ElMessage.error('获取列表失败')
            }
        }
        const router = useRouter()
        const ToParticulars = (articleId: number) => {
            router.push({
                path: '/articleParticulars',
                query: { articleId }
            })
        }
        return {
            pageQuery,
            getArticleList,
            articleList,
            ToParticulars,
        }
    }
}
</script>

<style scoped lang="less">
.home_box {
    display: flex;
    width: 100%;

    .left_box {
        width: 25%;
    }

    .middle_box {
        width: 50%;
        padding: 10px;
        border-left: 2px solid var(--elementColor);
        border-right: 2px solid var(--elementColor);
        .card_class{
            padding: 20px;
           border-bottom: 1px solid var(--elementColor)
        }
    }

    .right_box {
        width: 25%;
    }
}
</style>