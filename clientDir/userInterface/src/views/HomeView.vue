<template>
    <div class="home_box">
        <div class="web_introduction_box">
            <h1>欢迎来到huafeng，我的在线知识库</h1>
            <p>
                这个网站是我个人学习、生活感悟及技术实践的记录空间，并非公开宣传的站点。如果你偶然间访问到了这里，那或许就是一种奇妙的缘分
            </p>
            <p>
                网站设计遵循
                <span class="significant">"更简单、更纯粹"</span>
                的原则，这也是我的生活哲学
            </p>
            <p>
                对于意外到访的你，如果有任何建议或想法，欢迎通过关于界面的联系方式与我沟通
            </p>
        </div>

        <div class="my_introduction_box">
            <h1>关于我</h1>
            <p>你好，我是
                <span class="significant">Wen Jiang</span>
                ，huafeng的创始人与维护者

            </p>
            <p>
                我崇尚简洁纯粹的生活哲学，追求技术与艺术的完美结合
            </p>
            <p>
                huafeng，就是我这一理念的集中体现，它包含了我的思想理念，记录了我的成长轨迹，也见证了我与众多先行者思想的碰撞与共鸣
            </p>
        </div>

        <div class="middle_box">
            <h1>推荐文章</h1>
            <div class="card_box">
                <div class="card_class" v-for="(article, index) in articleList" key="index">
                    <h2 class="title_txt">{{ article.title }}</h2>
                    <span class="updata_txt">更新时间：{{ article.updated_at }}</span>
                    <div style="height: 100px;">
                        <p class="abstract_box">{{ article.abstract || "此处为摘要" }}</p>
                    </div>
                    <el-button class="all_btn" color="var(--txtColor)" @click="ToParticulars(article.id)">阅读</el-button>
                </div>
            </div>
        </div>
        <div class="technique_box">
            <h1>网站技术</h1>
            <!--全局-->
            <div class="card_box">
                <div class="card_class" v-for="(item, index) in overallList" key="index">
                    <svg class="icon technique_icon" aria-hidden="true">
                        <use :href=item.icon></use>
                    </svg>
                    <p>{{ item.name }}</p>
                    <p>{{ item.versions }}</p>
                </div>
            </div>
            <!--后端-->
            <div class="card_box">
                <div class="card_class" v-for="(item, index) in serverList" key="index">
                    <svg class="icon technique_icon" aria-hidden="true">
                        <use :href=item.icon></use>
                    </svg>
                    <p>{{ item.name }}</p>
                    <p>{{ item.versions }}</p>
                </div>
            </div>
            <!--前端-->
            <div class="card_box">
                <div class="card_class" v-for="(item, index) in clientList" key="index">
                    <svg class="icon technique_icon" aria-hidden="true">
                        <use :href=item.icon></use>
                    </svg>
                    <p>{{ item.name }}</p>
                    <p>{{ item.versions }}</p>
                </div>
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
        //全局技术
        const overallList = [{
            icon: "#icon-typescript",
            name: "TypeScript",
            versions: "5.4.0"
        },
        {
            icon: "#icon-Nodejs",
            name: "Node.js",
            versions: "20.18.01"
        },
        {
            icon: "#icon-macos",
            name: "MacOS",
            versions: "15.0.1"
        },
        {
            icon: "#icon-ubuntu",
            name: "Ubuntu",
            versions: "24.10"
        }]
        //服务器技术
        const serverList = [{
            icon: "#icon-ic_taskedit_kafka",
            name: "Koa.js",
            versions: "2.15.3"
        },
        {
            icon: "#icon-mysql1",
            name: "mySQL",
            versions: "3.11.0"
        },
        {
            icon: "#icon-J",
            name: "Joi",
            versions: "17.13.3"
        },
        {
            icon: "#icon-jiami",
            name: "bcrypt",
            versions: "2.4.3"
        },
        {
            icon: "#icon-cors",
            name: "Cors",
            versions: "2.0.6"
        },{
            icon: "#icon-Nginx",
            name: "Nginx",
            versions: "1.24.0"
        },{
            icon: "#icon-ks",
            name: "Kubernetes",
            versions: "1.3.1"
        },]
        //客户端技术
        const clientList = [{
            icon: "#icon-Vue",
            name: "Vue3",
            versions: "3.4.29"
        },
        {
            icon: "#icon-element-plus",
            name: "ElementPlus",
            versions: "2.8.2"
        }, {
            icon: "#icon-pinia",
            name: "Pinia",
            versions: "2.1.7"
        }, {
            icon: "#icon-axios",
            name: "Axios",
            versions: "1.7.7"
        }, {
            icon: "#icon-eslint",
            name: "Eslint",
            versions: "8.57.0"
        }, {
            icon: "#icon-wangeditor-menu-img-",
            name: "Wangeditor",
            versions: "5.1.23"
        },{
            icon: "#icon-less",
            name: "Less",
            versions: "4.2.0"
        }]

        return {
            overallList,
            serverList,
            clientList,
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

    .web_introduction_box,
    .my_introduction_box,
    .middle_box,
    .technique_box {
        text-align: center;
        width: 90%;
        height: 666px;
        padding: 20px;
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .web_introduction_box,
    .my_introduction_box {
        .significant {
            font-size: 20px;
            font-weight: bold;
        }
    }

    .middle_box {
        .card_box {

            display: flex;

            .card_class {
                // border-radius: 10px;
                width: 18%;
                height: 250px;
                margin: 10px;
                display: flex;
                text-align: center;
                flex-direction: column;
                border: 1px solid var(--systemColor);
                padding: 20px;

                .title_txt {
                    font-weight: bold
                }

                .updata_txt {
                    font-size: smaller;
                    font-weight: bolder;
                    margin: 5px 0
                }

                .abstract_box {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 5;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: small;
                }

                .all_btn {
                    width: 60px;
                    margin: 10px auto 0px auto;
                }
            }
        }

    }

    .technique_box {
        .card_box {
            display: flex;

            .card_class {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 1px solid var(--systemColor);
                margin: 10px;
                padding: 10px;
                text-align: center;
                width: 120px;
                height: 150px;

                .technique_icon {
                    width: 60px;
                    height: 60px;
                }
            }
        }

    }
}
</style>