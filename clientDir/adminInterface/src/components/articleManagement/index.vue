<template>
    <div class="article_box">
        <!-- <h1 class="title_class">文章管理</h1> -->
        <el-button type="success" @click="viewArticle()">新建文章</el-button>
        <el-table :data="tableData" height="530" :style="{ width: '100%' }">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="category" label="类别" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="info" v-if="!scope.row.recommend" @click="recommendBtn(scope.row)">常规</el-button>
                    <el-button type="warning" v-else @click="recommendBtn(scope.row)">推荐</el-button>
                    <el-button type="danger" v-if="!scope.row.state" @click="stateBtn(scope.row)">已下架</el-button>
                    <el-button type="success" v-else @click="stateBtn(scope.row)">已上架</el-button>
                    <el-button type="primary" @click="viewArticle(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="deleBtn(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pag_class" background @current-change="handleCurrentChange" :current-page="parameter.page"
            :page-size="parameter.pageSize" layout="prev, pager, next" :total="totalCount" />
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { myStore } from '@/stores';
import { ElMessage } from 'element-plus'
import http from '@/axios'

export default {
    setup() {
        onMounted(async () => {
            getActive()
        })
        const store = myStore()

        const tableData = ref([])
        const viewArticle = (value?: any) => {
            if (!value) {
                store.articleNewOrEdit = 0
            } else {
                console.log(`获取文章id${value.id}`)
                store.articleNewOrEdit = value.id
            }
            store.updataMainStateFun(21)
        }
        const parameter = ref({//分页
            page: 1,
            pageSize: 10
        })
        const totalCount = ref(0)//数据总条数
        //获取文章列表
        const articleList = ref([])
        const getActive = async () => {
            const response = await http.get('article/list', {
                params: parameter.value
            })
            articleList.value = response.data.data
            totalCount.value = response.data.totalCount
            // console.log("获取文章列表",articleList.value);
            getCategoryList()
        }
        //存储文章类别列表
        const categoryList = ref([])
        //获取类别列表-文章类别
        const getCategoryList = async () => {
            const response = await http.get('categories/list', { params: { type: "article_category" } })
            categoryList.value = response.data.data
            // console.log("获取文章类别列表",categoryList.value);
            updateCategoryNames()
        }
        // 更新文章列表中的类别名称  
        const updateCategoryNames = () => {
            tableData.value=articleList.value
            // 遍历 articleList 中的每一项  
            tableData.value.forEach(article => {
                // 尝试在 categoryList 中找到与 article.categoryId 相匹配的对象  
                const category = categoryList.value.find(cat => cat.id === article.categoryId);

                // 如果找到了匹配的对象，就更新 article 的 category 属性  
                if (category) {
                    // 这里我们假设 article 对象是可以直接修改的（即它不是通过某些不可变数据处理库创建的）  
                    // 如果 article 是不可变的，你需要使用相应的方法来更新它  
                    article.category = category.name;
                } else {
                    // 如果没有找到匹配的对象，你可以选择设置一个默认值，或者不做任何操作  
                    // 例如，你可以将 article.category 设置为 null 或 ''（空字符串）  
                    article.category = "未分类"; // 如果需要的话，取消注释这行代码  
                }
            });
            // console.log("替换后的data",tableData.value);
        };
        const deleBtn = async (value: any) => {
            await http.delete(`article/delete/${value.id}`)
            try {
                ElMessage({
                    message: '删除文章成功',
                    type: 'success',
                })
                getActive()
            } catch (error) {
                ElMessage.error('删除文章失败')
            }
        }
        const handleCurrentChange = async (value: number) => {
            parameter.value.page = value
            getActive()
        };
        const stateBtn = async (value: any) => {
            try {
                const parameter = {
                    id: value.id,
                    state: !value.state
                }
                await http.put('article/put', parameter)
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
                getActive()


            } catch (error) {
                ElMessage.error('修改失败')
            }
        }
        const recommendBtn = async (value: { id: any; recommend: any; }) => {
            try {
                const parameter = {
                    id: value.id,
                    recommend: !value.recommend
                }
                await http.put('article/put', parameter)
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
                getActive()
            } catch (error) {
                ElMessage.error('修改失败')
            }
        }
        return {
            recommendBtn,
            stateBtn,
            tableData,
            viewArticle,
            getActive,
            handleCurrentChange,
            totalCount,
            parameter,
            deleBtn,
            getCategoryList,
            categoryList,
            articleList,
            updateCategoryNames,
        }
    }
}

</script>

<style>
.title_class {
    margin-bottom: 20px;
}

.pag_class {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
}

.app-container {
    padding: 20px;
}
</style>