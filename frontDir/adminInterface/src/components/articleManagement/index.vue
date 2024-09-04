<template>
    <div class="article_box">
        <h1 class="title_class">文章管理</h1>
        <el-button type="success" @click="newarticlewin=true">新建文章</el-button>
        <el-table :data="tableData" height="500" :style="{ width: '100%' }">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="category" label="类别" />
            <el-table-column prop="label" label="标签" />
            <el-table-column prop="date" label="修改时间" />
            <el-table-column label="操作">
                <el-button type="primary">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
        <el-pagination class="pag_class" background layout="prev, pager, next" :total="100" page-size="20" />
    </div>
    <el-dialog v-model="newarticlewin" title="新建文章">
        <div class="app-container">
            <RichTextEditor v-model="content" /> 
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newarticlewin = false">取消</el-button>
                <el-button type="primary" @click="newarticlewin = false"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue';
import RichTextEditor from './RichTextEditor.vue';

export default {
    components: {  
        RichTextEditor // 注册组件  
    },  
    setup() {
        const tableData = [
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            },
            {
                title: '标题',
                category: '类别',
                label: '标签',
                date: '修改时间',
            }
        ]
        const newarticlewin=ref(false);
        const content=ref('<p>在这里输入</p>')
        return {
            tableData,
            newarticlewin,
            content
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