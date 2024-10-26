<template>
    <!-- <el-select v-model="value" placeholder="全部" size="large" style="width: 240px" @change="selectGroupKeyFun">
        <el-option v-for="item in options" :key="item.type" :label="item.typeName" :value="item.type" />
    </el-select> -->
    <el-button class="add_btn" type="success" :icon="Plus" circle @click="newSystemWin = true"></el-button>
    <el-table :data="tableData" height="530" :style="{ width: '100%' }">
        <el-table-column prop="name" label="类别名称" />
        <el-table-column prop="type" label="类别类型" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="danger" @click="deleBtn(scope.row.id)" :icon="Delete" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="newSystemWin" title="添加类别">
        <div>
            <el-input v-model="addSystemData.name" placeholder="请输入类型名称" />
            <el-input v-model="addSystemData.type" placeholder="请输入类型类别" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newSystemWin = false">取消</el-button>
                <el-button type="primary" @click="addFun"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue';
import { Plus, Delete } from '@element-plus/icons-vue';
import { myStore } from '@/stores';
import { ElMessage } from 'element-plus';
import http from '@/axios';

export default {
    setup() {
        const stores = myStore()
        onMounted(() => {
            getList()
        })
        const tableData = ref()
        const options = ref()
        const getList = async (value?: any) => {
            const response = await http.get('categories/list', {params:value})
            tableData.value = response.data.data;
        }
        const value = ref('')
        const deleBtn = async(value: number) => {
            try {
                await http.delete(`/categories/delete/${value}`)
                ElMessage({
                    message: '删除成功',
                    type: 'success',
                })
                getList()
            } catch (error) {
                ElMessage.error('删除失败')
            }
        }
        const selectGroupKeyFun = (value: any) => {
            getList({ type: value })

        }
        const newSystemWin = ref(false)
        const addSystemData = ref({
            name: "",
            type: "",
        })
        const addFun = async () => {
            try {
                await http.post('/categories/add', addSystemData.value)
                ElMessage({
                    message: '添加成功',
                    type: 'success',
                })
                newSystemWin.value = false
                getList()
            } catch (error) {
                ElMessage.error('添加失败')
            }
        }

        return {
            newSystemWin,
            addSystemData,
            addFun,
            value,
            options,
            tableData,
            deleBtn,
            Plus,
            Delete,
            getList,
            // getTypeList,
            selectGroupKeyFun
        }
    }
}
</script>

<style scoped>
.add_btn {
    margin-left: 10px;
}
</style>