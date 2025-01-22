<template>
    <div class="article_box">
        <div class="card_box">
            <div class="card_class" v-for="(article, index) in articleList" key="index">
                <h2 class="title_txt">{{ article.title }}</h2>
                <span class="updata_txt">更新时间：{{ article.updated_at }}</span>
                <div style="height: 170px;">
                    <div class="abstract_container" ref="abstractContainers">
                        <p class="abstract_box" ref="abstractBoxes">{{ article.abstract || "此处为摘要" }}</p>
                    </div>
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
import { ref, onMounted, nextTick } from 'vue';
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
        const abstractBoxes = ref<HTMLElement[]>([])
        const abstractContainers = ref<HTMLElement[]>([])

        onMounted(async () => {
            await getArticleList()
            // 等待DOM更新后检查文本是否溢出
            nextTick(() => {
                checkTextOverflow()
            })
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
                query: { id: articleId }
            })
        }
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
            ToParticulars,
            pageBtn,
            getArticleList,
            articleList,
            totalCount,
            pageCount,
            abstractBoxes,
            abstractContainers,
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
    padding: 20px;

    .card_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 1200px;

        .card_class {
            border: 1px solid var(--systemColor);
            width: 280px;
            height: 320px;
            margin: 15px;
            padding: 20px;
            background: transparent;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: center;
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

    .page_box {
        margin-top: 30px;
        
        .page_btn {
            margin: 5px;
            padding: 8px 12px;
            border: 1px solid var(--systemColor);
            background: transparent;
            color: var(--systemColor);
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 4px;

            &:hover {
                background: var(--systemColor);
                color: var(--outElementColor);
            }
        }
    }
}
</style>