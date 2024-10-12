<template>
    <!-- <el-button @click="backBtn"  color="var(--txtColor)">返回上一页</el-button> -->
    <div class="particulars_box">
        <h1>{{ particulars.title }}</h1>
        <div class="content_box">
            <div class="messge_box">
                <span>创建时间：{{ particulars.created_at }}</span>
                <span>更新时间：{{ particulars.updated_at }}</span>
                <span>分类：{{ particulars.category }}</span>
            </div>
            <div class="content" v-html="particulars.content"></div>
            <div class="catalogue">

            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { myStore } from '@/stores/counter';

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
            category:string;
            created_at:string;
            updated_at:string; 
        }
        const particulars = ref<ArticleData>({} as ArticleData)
        const getParticulars = async (id: number) => {
            const data = await stores.getDataToServer("article/content", { id: id })
            particulars.value = data.data
        }
        const router=useRouter()
        const backBtn=()=>{
            router.back()
        }
        return {
            backBtn,
            particulars,
            getParticulars,
        }
    }
}
</script>

<style scoped>
.messge_box{

}
</style>