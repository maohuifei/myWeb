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

export default {
    setup() {
        onMounted(async () => {
            getActive()
        })
        const store = myStore()

        const tableData = ref([])
        const viewArticle = (value?:any) => {
            if(!value){
                store.articleNewOrEdit=0
            }else{
                console.log(`获取文章id${value.id}`)
                store.articleNewOrEdit=value.id
            }
            store.updataMainStateFun(21)
        }
        const parameter = ref({//分页
            page: 1,
            pageSize: 10
        })
        const totalCount = ref(0)//数据总条数
        const getActive = async () => {
            const getData = await store.getDataToServer('article/list', parameter.value)
            tableData.value = getData.data
            totalCount.value = getData.totalCount
        }
        const deleBtn = async (value:any) => {
            await store.delDataToServer('article/delete', value.id)
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
        const stateBtn= async(value)=>{
            try {
                    const parameter={
                        id:value.id,
                        state:!value.state
                    }
                    await store.putDataToServer('article/put', parameter)
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                    getActive()


                } catch (error) {
                    ElMessage.error('修改失败')
                }
        }
        const recommendBtn=async(value)=>{
            try {
                    const parameter={
                        id:value.id,
                        recommend:!value.recommend
                    }
                    await store.putDataToServer('article/put', parameter)
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