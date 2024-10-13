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
            created_at: string;
            updated_at: string;
        }
        const particulars = ref<ArticleData>({} as ArticleData)
        const utils = new Utils()
        const getParticulars = async (id: number) => {
            const data = await stores.getDataToServer("article/content", { id: id })
            particulars.value = data.data
            particulars.value.created_at = utils.formatDate(data.data.created_at)
            particulars.value.updated_at = utils.formatDate(data.data.updated_at)
        }
        // const router = useRouter()
        // const backBtn = () => {
        //     router.go(-1)
        // }
        return {
            // backBtn,
            particulars,
            getParticulars,
        }
    }
}
</script>

<style scoped lang="less">
.particulars_box {
    .title{
        font-weight: bold;
        font-size:xx-large;
    }
    .content_box {
        .messge_box {
            margin: 20px 0;
            span{
                margin-right: 20px;
                font-weight: bold;
            }
            .category{
                background-color: var(--elementColor);
                color: white;
                padding: 5px 10px;
            }
        }
    }
}
</style>