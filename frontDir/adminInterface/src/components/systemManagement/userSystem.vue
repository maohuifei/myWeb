<template>
    <div>
        <h1>用户配置</h1>
        <h2>类别配置</h2><el-button type="success" @click="newusercategorywin=true">添加类别</el-button>
        <el-table :data="classificationData" height="250" style="width: 40%">
            <el-table-column prop="name" label="类别名称"  />
            <el-table-column prop="remark" label="描述"  />
            <el-table-column label="操作">
                <el-button type="primary" @click="newusercategorywin=true">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="newusercategorywin" title="添加用户类别">
        <div>
            <el-input v-model="newusercategoryname" placeholder="请输入类别名称" />
            <el-input v-model="newremark" placeholder="请输入描述" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newusercategorywin = false">取消</el-button>
                <el-button type="primary" @click="newusercategorywin = false"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const classificationData = [
            {
                name: '类别1',
                remark: '描述'
            },
            {
                name: '类别2',
                remark: '描述'
            },
            {
                name: '类别3',
                remark: '描述'
            },
        ]
        const newusercategorywin=ref(false);
        const newusercategoryname=ref('');
        const newremark=ref('');
        return {
            classificationData,
            newusercategorywin,
            newusercategoryname,
            newremark
        }
    }
}
</script>