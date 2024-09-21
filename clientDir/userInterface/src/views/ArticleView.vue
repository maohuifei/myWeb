<template>
    <div class="article_box">
        <el-card class="card_class" v-for="(article, index) in articleList" shadow="hover" key="index">
            <h2>{{ article.title }}</h2>
            <span>更新时间：{{ article.updated_at }}</span>
            <p class="abstract_box">{{ article.abstract||"此处为摘要" }}</p>
            <el-button class="all_btn" color="#a0997c" :bg="false" style="color: white;">阅读</el-button>
        </el-card>
    </div>
    <div class="page_box">
        <el-pagination :background="true" layout="prev, pager, next" :total="totalCount" @current-change="handleCurrentChange" :default-page-size="20"/>
    </div>
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue';
import { myStore } from '@/stores/counter';
import { ElMessage } from 'element-plus';
import { Utils } from '@/utils';

export default {
    setup() {
        const articleList = ref()
        const stores = myStore()
        const utils = new Utils()
        const pageQuery = ref({
            page: 1,
            pageSize: 20
        })
        const totalCount = ref()
        onMounted(async () => {
            getArticleList()
        })
        const handleCurrentChange=(value:number)=>{
            pageQuery.value.page=value
            getArticleList()
        }
        const getArticleList = async () => {
            try {
                const returned = await stores.getDataToServer('article/list', pageQuery.value)

                totalCount.value = returned.totalCount
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
        return {
            handleCurrentChange,
            getArticleList,
            articleList,
            totalCount,
        }
    }
}
</script>

<style scoped>
.all_btn{
    color: var(--elementColor);
    background-color: none;
}
.abstract_box {
    height: 160px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    overflow: hidden;
    text-overflow: ellipsis;
}

.page_box {
    display: flex;
    justify-content: center;
}



.card_class {
    width: 243px;
    height: 300px;
    margin: 10px;
    background: transparent;
    border-color: var(--elementColor);
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
}
.article_box {
    display: flex;
    flex-wrap: wrap;
    color: var(--textColor);
}
</style>