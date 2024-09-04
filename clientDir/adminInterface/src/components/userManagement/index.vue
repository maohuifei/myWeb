<template>
    <div class="article_box">
        <h1 class="title_class">用户管理</h1>
        <el-button type="success" @click="newuseerwin=true">新增用户</el-button>
        <el-table :data="tableData" height="500" :style="{ width: '100%' }">
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="category" label="类别" />
            <el-table-column label="操作">
                <el-button type="primary" @click="newuseerwin=true">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
        <el-pagination class="pag_class" background layout="prev, pager, next" :total="100" page-size="20" />
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
import { ref } from 'vue';
export default {
    setup() {
        const tableData = [
            {
                username: '用户1',
                category: '类别'
            },
            {
                username: '用户2',
                category: '类别'
            },
            {
                username: '用户3',
                category: '类别'
            }
        ];
        const newuseerwin=ref(false);
        const username=ref('');
        const category=ref('');
        return {
            tableData,
            newuseerwin,
            username,
            category
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