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
                    <div class="abstract_container" ref="abstractContainers">
                        <p class="abstract_box" ref="abstractBoxes">{{ article.abstract || "此处为摘要" }}</p>
                    </div>
                    <button class="all_btn" color="var(--txtColor)" @click="ToParticulars(article.id)">阅读</button>
                </div>
            </div>
        </div>

        <div class="technique_box">
            <h1>网站技术</h1>
            <!--全局-->
            <div class="card_box">
                <a v-for="(item, index) in overallList" 
                   :key="index" 
                   :href="item.url" 
                   target="_blank" 
                   class="card_class">
                    <svg class="icon technique_icon" aria-hidden="true">
                        <use :href=item.icon></use>
                    </svg>
                    <p>{{ item.name }}</p>
                    <p>{{ item.versions }}</p>
                </a>
            </div>
            <!--后端-->
            <div class="card_box">
                <a v-for="(item, index) in serverList" 
                   :key="index" 
                   :href="item.url" 
                   target="_blank" 
                   class="card_class">
                    <svg class="icon technique_icon" aria-hidden="true">
                        <use :href=item.icon></use>
                    </svg>
                    <p>{{ item.name }}</p>
                    <p>{{ item.versions }}</p>
                </a>
            </div>
            <!--前端-->
            <div class="card_box">
                <a v-for="(item, index) in clientList" 
                   :key="index" 
                   :href="item.url" 
                   target="_blank" 
                   class="card_class">
                    <svg class="icon technique_icon" aria-hidden="true">
                        <use :href=item.icon></use>
                    </svg>
                    <p>{{ item.name }}</p>
                    <p>{{ item.versions }}</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { ref, onMounted, nextTick } from 'vue';
import { myStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
import { Utils } from '@/utils';

export default {
    setup() {
        const stores = myStore()
        const pageQuery = ref({
            page: 1,
            pageSize: 10,
            recommend: true
        })
        const articleList = ref()
        const abstractBoxes = ref<HTMLElement[]>([])
        const abstractContainers = ref<HTMLElement[]>([])

        onMounted(async () => {
            await getArticleList()
            // 等待DOM更新后检查文本是否溢出
            nextTick(() => {
                checkTextOverflow()
            })
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
        //全局技术
        const overallList = [{
            icon: "#icon-typescript",
            name: "TypeScript",
            versions: "5.4.0",
            url: "https://www.typescriptlang.org/"
        },
        {
            icon: "#icon-Nodejs",
            name: "Node.js",
            versions: "20.18.01",
            url: "https://nodejs.org/"
        },]
        //服务器技术
        const serverList = [{
            icon: "#icon-ic_taskedit_kafka",
            name: "Koa.js",
            versions: "2.15.3",
            url: "https://koajs.com/"
        },
        {
            icon: "#icon-mysql1",
            name: "mySQL",
            versions: "3.11.0",
            url: "https://www.mysql.com/"
        }, {
            icon: "#icon-Nginx",
            name: "Nginx",
            versions: "1.24.0",
            url: "https://nginx.org/"
        }, {
            icon: "#icon-ks",
            name: "Kubernetes",
            versions: "1.3.1",
            url: "https://kubernetes.io/"
        },]
        //客户端技术
        const clientList = [{
            icon: "#icon-Vue",
            name: "Vue3",
            versions: "3.4.29",
            url: "https://vuejs.org/"
        }, {
            icon: "#icon-pinia",
            name: "Pinia",
            versions: "2.1.7",
            url: "https://pinia.vuejs.org/"
        }, {
            icon: "#icon-axios",
            name: "Axios",
            versions: "1.7.7",
            url: "https://axios-http.com/"
        }, {
            icon: "#icon-wangeditor-menu-img-",
            name: "Wangeditor",
            versions: "5.1.23",
            url: "https://www.wangeditor.com/"
        },]

        const checkTextOverflow = () => {
            abstractBoxes.value.forEach((box, index) => {
                const container = abstractContainers.value[index]
                if (box && container) {
                    // 检查文本是否溢出
                    const isOverflowing = box.scrollHeight > box.clientHeight
                    if (isOverflowing) {
                        container.classList.add('has-overflow')
                    } else {
                        container.classList.remove('has-overflow')
                    }
                }
            })
        }

        return {
            overallList,
            serverList,
            clientList,
            pageQuery,
            getArticleList,
            articleList,
            ToParticulars,
            abstractBoxes,
            abstractContainers,
        }
    }
}
</script>

<style scoped lang="less">
.home_box {
    display: flex;
    flex-direction: column;
    padding-top: 60px;

    .web_introduction_box,
    .my_introduction_box,
    .middle_box,
    .technique_box {
        text-align: center;
        width: 100%;
        max-width: 1200px;
        min-height: 100vh;
        padding: 120px 20px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            font-size: 2.5em;
            color: var(--systemColor);
            margin-bottom: 40px;
            position: relative;
        }

        p {
            font-size: 1.1em;
            line-height: 1.8;
            margin: 15px 0;
            max-width: 800px;
            color: #333;
        }
    }

    .web_introduction_box {
        min-height: calc(100vh - 60px);
        padding: 40px 20px;
        padding-top: 0;
        justify-content: flex-start;
        padding-top: 15vh;
    }

    .my_introduction_box,
    .middle_box,
    .technique_box {
        padding: 120px 20px;
    }

    .web_introduction_box,
    .my_introduction_box {
        .significant {
            font-size: 1.3em;
            font-weight: bold;
            color: var(--systemColor);
            padding: 0 5px;
            position: relative;
            
            &::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 100%;
                height: 2px;
                background: var(--systemColor);
                transform: scaleX(0);
                transition: transform 0.3s ease;
                transform-origin: right;
            }

            &:hover::after {
                transform: scaleX(1);
                transform-origin: left;
            }
        }

        p {
            font-size: 1.1em;
            line-height: 1.6;
            margin: 12px auto;
            max-width: 800px;
            color: #333;
            letter-spacing: 0.5px;
            text-align: center;
            
            &:hover {
                color: #000;
                transition: color 0.3s ease;
            }
        }
    }

    .my_introduction_box,
    .middle_box,
    .technique_box {
        h1 {
            &::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 120px;
                height: 3px;
                background: var(--systemColor);
            }
        }
    }

    .middle_box {
        .card_box {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
            margin-top: 30px;

            .card_class {
                width: 280px;
                height: 320px;
                display: flex;
                text-align: center;
                flex-direction: column;
                border: 1px solid var(--systemColor);
                padding: 25px;
                background: white;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: var(--systemColor);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.3s ease;
                }

                &:hover::before {
                    transform: scaleX(1);
                }

                .title_txt {
                    font-weight: bold;
                    font-size: 1.2em;
                    margin-bottom: 10px;
                    color: var(--systemColor);
                }

                .updata_txt {
                    font-size: 0.9em;
                    font-weight: 500;
                    margin: 10px 0;
                    color: #666;
                }

                .abstract_container {
                    flex: 1;
                    overflow: hidden;
                    margin: 10px 0;
                    position: relative;

                    &.has-overflow::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 20px;
                        background: linear-gradient(transparent, white);
                    }

                    .abstract_box {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 6;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 0.95em;
                        line-height: 1.5;
                        color: #333;
                    }
                }

                .all_btn {
                    width: 80px;
                    margin: 15px auto 0;
                    background-color: var(--systemColor);
                    color: var(--outElementColor);
                    padding: 8px 15px;
                    border: none;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    cursor: pointer;

                    &:hover {
                        opacity: 0.9;
                        transform: scale(1.05);
                    }
                }
            }
        }
    }

    .technique_box {
        h1 {
            margin-bottom: 40px;
        }

        .card_box {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
            margin: 30px 0;

            .card_class {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 1px solid var(--systemColor);
                padding: 20px;
                width: 150px;
                height: 180px;
                background: white;
                transition: all 0.3s ease;
                text-decoration: none;
                color: inherit;
                cursor: pointer;

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }

                .technique_icon {
                    width: 70px;
                    height: 70px;
                    margin-bottom: 15px;
                    transition: all 0.3s ease;
                    fill: var(--systemColor);
                }

                &:hover .technique_icon {
                    transform: scale(1.1);
                }

                p {
                    margin: 5px 0;
                    font-size: 1em;

                    &:first-of-type {
                        font-weight: bold;
                        color: var(--systemColor);
                    }

                    &:last-of-type {
                        font-size: 0.9em;
                        color: #666;
                    }
                }
            }
        }
    }
}
</style>