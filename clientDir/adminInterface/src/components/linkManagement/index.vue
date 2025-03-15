<template>
  <div class="link-management">
    <el-card>
      <div class="header">
        <el-button type="primary" @click="handleCreate">新建链接</el-button>
      </div>
      
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="category" label="类别" width="120" />
        <el-table-column prop="icon" label="图标" width="100">
          <template #default="scope">
            <el-icon :size="20">
              <component :is="iconOptions.includes(scope.row.icon) ? scope.row.icon : 'LinkIcon'" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="summary" label="摘要" />
        <el-table-column prop="url" label="地址" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="类别" required>
          <el-input v-model="formData.category" />
        </el-form-item>
        <el-form-item label="图标" required>
            <el-input v-model="formData.icon" />
        </el-form-item>
        <el-form-item label="名称" required>
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="formData.summary" type="textarea" />
        </el-form-item>
        <el-form-item label="地址" required>
          <el-input v-model="formData.url" />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Document, Monitor, Setting, Link as LinkIcon } from '@element-plus/icons-vue'
import http from '@/axios';

interface Link {
  id?: number
  category: string
  icon: string
  name: string
  summary: string
  url: string
}

const tableData = ref<Link[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('新建链接')
const formData = ref<Link>({
  category: '',
  icon: '',
  name: '',
  summary: '',
  url: ''
})

const iconOptions = [Document, Monitor, Setting, LinkIcon].map(item => item.name)

const fetchLinks = async () => {
  try {
    loading.value = true
    const response = await http.get('/link/list')
    tableData.value = response.data.data
  } catch (error) {
    ElMessage.error('获取链接列表失败')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  formData.value = {
    category: '',
    icon: '',
    name: '',
    summary: '',
    url: ''
  }
  dialogTitle.value = '新建链接'
  dialogVisible.value = true
}

const handleEdit = (row: Link) => {
  formData.value = { ...row }
  dialogTitle.value = '编辑链接'
  dialogVisible.value = true
}

const submitForm = async () => {
  try {
    if (formData.value.id) {
      await http.put(`/link/put`, formData.value)
    } else {
      await http.post('/link/add', formData.value)
    }
    ElMessage.success('操作成功')
    dialogVisible.value = false
    await fetchLinks()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleDelete = (row: Link) => {
  ElMessageBox.confirm('确认删除该链接？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await http.delete(`/link/delete/${row.id}`)
      ElMessage.success('删除成功')
      await fetchLinks()
    } catch (error) {
      ElMessage.error('删除失败')
    }
  })
}

onMounted(() => {
  fetchLinks()
})
</script>

<style scoped>
.link-management {
  padding: 20px;
}
.header {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>