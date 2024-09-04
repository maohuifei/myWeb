<template>
    <div>
        <h1>文章配置</h1>
        <h2>类别配置</h2><el-button type="success" @click="newcategorywin=true">添加类别</el-button>
        <el-table :data="classificationData" height="250" style="width: 40%">
            <el-table-column prop="name" label="类别名称"  />
            <el-table-column prop="remark" label="描述"  />
            <el-table-column label="操作">
                <el-button type="primary" @click="newcategorywin=true">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
        <h2>标签配置</h2><el-button type="success"  @click="newpagewin=true">添加标签</el-button>
        <el-table :data="pageData" height="250" style="width: 40%">
            <el-table-column prop="name" label="标签" />
            <el-table-column label="操作">
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="newcategorywin" title="添加类别">
        <div>
            <el-input v-model="newcategoryname" placeholder="请输入类别名称" />
            <el-input v-model="newremark" placeholder="请输入描述" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newcategorywin = false">取消</el-button>
                <el-button type="primary" @click="newcategorywin = false"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="newpagewin" title="添加标签">
        <div>
            <el-input v-model="newpagename"/>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newpagewin = false">取消</el-button>
                <el-button type="primary" @click="newpagewin = false"> 确定 </el-button>
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
        const pageData = ref([
            {
                name: '标签1'
            },
            {
                name: '标签2'
            },
            {
                name: '标签3'
            },
        ])
        const newcategorywin=ref(false);
        const newpagewin=ref(false)
        const newcategoryname=ref('');
        const newremark=ref('');
        const newpagename=ref('');
        return {
            classificationData,
            pageData,
            newcategorywin,
            newpagewin,
            newcategoryname,
            newremark,
            newpagename
        }
    }
}
</script>