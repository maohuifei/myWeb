<template>
    <div class="categories-container">
        <div class="header-actions">
            <el-button class="add-button" type="primary" :icon="Plus" @click="handleAdd">添加类别</el-button>
        </div>
        
        <el-table 
            v-loading="loading"
            :data="tableData" 
            height="530" 
            class="categories-table"
            :style="{ width: '100%' }"
        >
            <el-table-column prop="name" label="类别名称" min-width="200">
                <template #default="{ row }">
                    <span class="category-name">{{ row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类别类型" min-width="200">
                <template #default="{ row }">
                    <el-tag size="large" :type="row.type ? '' : 'info'">{{ row.type }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template #default="scope">
                    <el-button-group>
                        <el-button 
                            type="danger" 
                            :icon="Delete" 
                            @click="handleDelete(scope.row)"
                            size="small"
                        >删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog 
            v-model="newSystemWin" 
            title="添加类别"
            width="500px"
            destroy-on-close
            class="category-dialog"
        >
            <el-form 
                :model="addSystemData" 
                ref="formRef" 
                :rules="rules"
                label-width="100px"
                class="category-form"
            >
                <el-form-item label="类型名称" prop="name">
                    <el-input 
                        v-model="addSystemData.name" 
                        placeholder="请输入类型名称"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="类型类别" prop="type">
                    <el-input 
                        v-model="addSystemData.type" 
                        placeholder="请输入类型类别"
                        clearable
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="addFun" :loading="submitting">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import { Plus, Delete } from '@element-plus/icons-vue';
import { myStore } from '@/stores';
import { ElMessage, ElMessageBox } from 'element-plus';
import http from '@/axios';
import type { FormInstance, FormRules } from 'element-plus'

const stores = myStore()
const formRef = ref<FormInstance>()
const loading = ref(false)
const submitting = ref(false)

onMounted(() => {
    getList()
})

const rules = {
    name: [
        { required: true, message: '请输入类型名称', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    type: [
        { required: true, message: '请输入类型类别', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ]
}

const tableData = ref([])
const getList = async (value?: any) => {
    loading.value = true
    try {
        const response = await http.get('categories/list', {params:value})
        tableData.value = response.data.data;
    } catch (error) {
        tableData.value = [];
        ElMessage.error('获取类别列表失败')
    } finally {
        loading.value = false
    }
}

const handleDelete = (row: any) => {
    ElMessageBox.confirm(
        `确定要删除类别"${row.name}"吗？`,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        try {
            await http.delete(`/categories/delete/${row.id}`)
            ElMessage({
                message: '删除成功',
                type: 'success',
            })
            getList()
        } catch (error) {
            ElMessage.error('删除失败')
        }
    }).catch(() => {
        // 取消删除，不做任何操作
    })
}

const newSystemWin = ref(false)
const addSystemData = ref({
    name: "",
    type: "",
})

const handleAdd = () => {
    addSystemData.value = {
        name: "",
        type: "",
    }
    newSystemWin.value = true
}

const handleCancel = () => {
    formRef.value?.resetFields()
    newSystemWin.value = false
}

const addFun = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if (valid) {
            submitting.value = true
            try {
                await http.post('/categories/add', addSystemData.value)
                ElMessage({
                    message: '添加成功',
                    type: 'success',
                })
                handleCancel()
                getList()
            } catch (error) {
                ElMessage.error('添加失败')
            } finally {
                submitting.value = false
            }
        }
    })
}
</script>

<style scoped>
.categories-container {
    padding: 20px;
    background-color: var(--bg-white);
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.header-actions {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}

.add-button {
    font-weight: 500;
}

.categories-table {
    margin-top: 16px;
    border-radius: 8px;
    overflow: hidden;
}

.categories-table :deep(.el-table__header) {
    background-color: var(--bg-color);
}

.categories-table :deep(.el-table__row) {
    transition: all 0.3s ease;
}

.categories-table :deep(.el-table__row:hover) {
    background-color: var(--bg-color) !important;
}

.category-name {
    font-weight: 500;
    color: var(--text-primary);
}

.category-dialog {
    border-radius: 8px;
}

.category-form {
    padding: 20px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 20px;
}

:deep(.el-tag) {
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
}

:deep(.el-button-group) {
    display: flex;
    gap: 8px;
}
</style>