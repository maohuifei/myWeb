<template>
    <div class="article_box">
        <h1 class="title_class">用户管理</h1>
        <el-button type="success" @click="newuseerwin = true">新增用户</el-button>
        <el-table :data="userList" height="500" :style="{ width: '100%' }">
            <el-table-column prop="name" label="用户名" />
            <el-table-column prop="category" label="类别" />
            <el-table-column label="操作">
                <el-button type="primary" @click="newuseerwin = true">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
        <el-pagination class="pag_class" background layout="prev, pager, next" :total="100" page-size="10" />
    </div>
    <el-dialog v-model="newuseerwin" title="新增用户">
        <div>
            <el-input v-model="username" placeholder="请输入用户名" />
            <el-input v-model="category" placeholder="请输入用户类别" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newuseerwin = false">取消</el-button>
                <el-button type="primary" @click="newuseerwin = false"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue';
import { ref,onMounted } from 'vue';
import { myStore } from '@/stores'

export default {
    setup() {
        const stores=myStore()
        const userList=ref(null)
        onMounted(async () => {
            userList.value = await stores.getDataToServer('user/list')
            // console.log(userList.value[1])
        })
        const newuseerwin = ref(false);
        const username = ref('');
        const category = ref('');
        return {
            newuseerwin,
            username,
            category,
            userList
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
</style>