<template>
    <div class="article_box">
        <div class="card_box">
            <div class="card_class" v-for="(article, index) in articleList" key="index">
                <h2 class="title_txt">{{ article.title }}</h2>
                <span class="updata_txt">更新时间：{{ article.updated_at }}</span>
                <div style="height: 170px;">
                    <p class="abstract_box">{{ article.abstract || "此处为摘要" }}</p>
                </div>
                <button class="all_btn" @click="ToParticulars(article.id)">阅读</button>
            </div>
        </div>
        <span class="page_box" v-if="pageCount>1">
            <button class="page_btn" v-for="item in pageCount" @click="pageBtn(item)">{{ item }}</button>
        </span> 
    </div>

</template>

<script lang='ts'>
import { ref, onMounted } from 'vue';
import { myStore } from '@/stores/counter';
import { Utils } from '@/utils';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const articleList = ref()
        const stores = myStore()
        const utils = new Utils()
        const pageQuery = ref({
            page: 1,
            pageSize: 20,
            state: true,
        })
        const totalCount = ref()
        const pageCount = ref(1)
        onMounted(async () => {
            getArticleList()
        })
        const pageBtn = (value: number) => {
            pageQuery.value.page = value
            getArticleList()
            console.log(value);
            
        }
        const getArticleList = async () => {
            try {
                const returned = await stores.getDataToServer('article/list', pageQuery.value)

                totalCount.value = returned.totalCount
                pageCount.value = Math.ceil(returned.totalCount / 20)
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
                console.error('获取列表失败');
                
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
            ToParticulars,
            pageBtn,
            getArticleList,
            articleList,
            totalCount,
            pageCount,
        }
    }
}
</script>

<style scoped lang="less">
.article_box {
    color: var(--txtColor);
    display: flex;
    flex-direction: column;
    align-items: center;

    .card_box {
        display: flex;
        flex-wrap: wrap;

        .card_class {
            border: 1px solid var(--systemColor);
            width: 243px;
            height: 300px;
            margin: 10px;
            padding: 10px;
            background: transparent;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;

            .all_btn {
                width: 60px;
                margin: auto;
                margin-bottom: 0;
                background-color: var(--systemColor);
                color: var(--outElementColor);
            }

            .title_txt {
                font-weight: bold
            }

            .updata_txt {
                font-size: smaller;
                font-weight: bolder;
                margin: 5px 0
            }

            .abstract_box {
                /* height: 100px; */
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 8;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: small;
            }
        }
    }


    .page_box {
        .page_btn{
            margin: 5px;
            border: none;
        }
    }
}
</style>