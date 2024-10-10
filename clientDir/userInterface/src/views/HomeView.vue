<template>
    <div class="home_box">
        <h1>欢迎来到huafeng，我的在线知识库</h1>
        <div class="web_introduction_box">
            <p>
                这个网站是我个人学习、生活感悟及技术实践的记录空间，并非公开宣传的站点。如果你偶然间访问到了这里，那或许就是一种奇妙的缘分
            </p>
            <p>
                网站设计遵循“崇尚极简、简洁纯粹”的原则，这也是我的生活哲学
            </p>
            <p>
                对于意外到访的你，如果有任何建议或想法，欢迎通过关于界面的联系方式与我沟通
            </p>
        </div>
        <h1>关于我</h1>
        <div class="my_introduction_box">
            
            <p>你好，我是Wen Jiang，huafeng的创始人与维护者

            </p>
            <p>
                我崇尚简洁纯粹的生活哲学，追求技术与艺术的完美结合
            </p>
            <p>
                huafeng，就是我这一理念的集中体现，它包含了我的思想理念，记录了我的成长轨迹，也见证了我与众多先行者思想的碰撞与共鸣
            </p>
        </div>
        <h1>推荐文章</h1>
        <div class="middle_box">
            <div class="card_class" v-for="(article, index) in articleList" key="index">
                <h2>{{ article.title }}</h2>
                <span>更新时间：{{ article.updated_at }}</span>
                <p class="abstract_box">{{ article.abstract || "此处为摘要" }}</p>
                <el-button class="all_btn" color="#a0997c" :bg="false" style="color: white;"
                    @click="ToParticulars(article.id)">阅读</el-button>
            </div>
        </div>
        <h1>网站使用的技术</h1>
        <div class="technique_box">
            <div class="card_class" v-for="(technique, index) in techniqueList" key="index">
                <div>icon</div>
                <p>{{ technique.name }}</p>
                <p>{{ technique.versions }}</p>
            </div>
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
            recommend: true
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
        const techniqueList = [{
            name: "TypeScript",
            versions: "1.0.0"
        },
        {
            name: "vue3",
            versions: "2.0.0"
        },
        {
            name: "Koa",
            versions: "3.0.0"
        },
        {
            name: "mySQL",
            versions: "4.0.0"
        }]
        return {
            techniqueList,
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
    flex-direction: column;
    justify-content: center;

    h1 {
        text-align: center;
    }

    .web_introduction_box,
    .my_introduction_box,
    .middle_box,
    .technique_box
     {
        text-align: center;
        height: 700px;
        width: 90%;
        padding: 20px;
        display: flex;
        margin: 0px auto;
    }
.web_introduction_box,
.my_introduction_box{
    flex-direction: column;
}
    .middle_box {
        .card_class {}
    }

    .technique_box {
        .card_class {
            background-color: rgb(121, 121, 239);
            margin: 10px;
            padding: 10px;
            text-align: center;
            width: 10%;
            height: 20%;
        }
    }
}
</style>