<template>
    <!-- <el-button @click="backBtn"  color="var(--txtColor)">返回上一页</el-button> -->
    <div class="particulars_box">
        <h1 class="title">{{ particulars.title }}</h1>
        <div class="content_box">
            <div class="messge_box">
                <span class="category">{{ particulars.category }}</span>
                <span>创建时间：{{ particulars.created_at }}</span>
                <span>更新时间：{{ particulars.updated_at }}</span>
            </div>
            <div class="content" v-html="particulars.content"></div>
            <div class="catalogue">

            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { myStore } from '@/stores/counter';
import { Utils } from '@/utils';

export default {
    setup() {
        onMounted(() => {
            const route = useRoute()
            const articleId = Number(route.query.articleId)
            getParticulars(articleId)
        })
        const stores = myStore()
        interface ArticleData {
            title: string;
            content: string;
            category: string;
            categoryId: number;
            created_at: string;
            updated_at: string;
        }
        const particulars = ref<ArticleData>({} as ArticleData)
        const utils = new Utils()
        const getParticulars = async (id: number) => {
            const data = await stores.getDataToServer("article/content", { id: id })
            particulars.value.title = data.data.title
            particulars.value.content = data.data.content
            particulars.value.categoryId = data.data.categoryId
            particulars.value.created_at = utils.formatDate(data.data.created_at)
            particulars.value.updated_at = utils.formatDate(data.data.updated_at)
            getCategoryList()
        }
        //存储文章类别列表
        const categoryList = ref([])
        //获取类别列表-文章类别
        const getCategoryList = async () => {
            const response = await stores.getDataToServer('categories/list', { type: "文章分类" })
            // console.log("获取文章类别列表",categoryList.value);
            // 假设 response.data 是一个包含多个类别的数组  
            const categories = response.data; // 这里应该根据实际情况调整，可能是 response.categories 或其他  

            // 查找与 particulars.value.categoryId 相匹配的类别  
            const matchingCategory = categories.find((category: { id: number; }) => category.id === particulars.value.categoryId);

            // 如果找到了匹配的类别，则更新 particulars.value 的 category 属性  
            if (matchingCategory) {
                // 注意：这里我们直接添加了 category 属性到 particulars.value，尽管它在原始接口中未定义  
                // 如果您想保持接口的一致性，您应该在接口中定义 category 属性，或者使用一个类型断言来绕过 TypeScript 的类型检查  
                (particulars.value as { category?: string }).category = matchingCategory.name;

                // 或者，如果您更新了接口定义，则可以直接这样写：  
                // particulars.value.category = matchingCategory.name;  
            }
        }

        return {
            getCategoryList,
            // backBtn,
            categoryList,
            particulars,
            getParticulars,
        }
    }
}
</script>

<style scoped lang="less">
.particulars_box {
    .title {
        font-weight: bold;
        font-size: xx-large;
    }

    .content_box {
        .messge_box {
            margin: 20px 0;

            span {
                margin-right: 20px;
                font-weight: bold;
            }

            .category {
                background-color: var(--elementColor);
                color: white;
                padding: 5px 10px;
            }
        }
    }
}
</style>