<template>
    <div class="user-management">
        <!-- 用户信息卡片 -->
        <el-card class="user-card">
            <template #header>
                <div class="card-header">
                    <span class="title">个人信息管理</span>
                    <el-button type="primary" @click="editInfo" :icon="Edit">编辑信息</el-button>
                </div>
            </template>
            <div class="user-info">
                <el-avatar 
                    :size="120" 
                    :src="userInfo.avatar" 
                    class="user-avatar"
                />
                <div class="info-content">
                    <div class="info-item">
                        <label>用户名：</label>
                        <span>{{ userInfo.username }}</span>
                    </div>
                    <div class="info-item">
                        <label>昵称：</label>
                        <span>{{ userInfo.nickname || '未设置' }}</span>
                    </div>
                    <div class="info-item">
                        <label>个人简介：</label>
                        <span>{{ userInfo.declaration || '暂无简介' }}</span>
                    </div>
                    <div class="info-item">
                        <label>地址：</label>
                        <span>{{ userInfo.address || '未设置' }}</span>
                    </div>
                    <div class="info-item">
                        <label>职位：</label>
                        <span>{{ userInfo.position || '未设置' }}</span>
                    </div>
                </div>
            </div>
        </el-card>
    </div>

    <!-- 编辑信息对话框 -->
    <el-dialog 
        v-model="editDialog" 
        title="编辑个人信息"
        width="500px"
        destroy-on-close
    >
        <el-form 
            :model="editForm" 
            label-width="100px"
            :rules="formRules"
            ref="formRef"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="editForm.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input 
                    v-model="editForm.password" 
                    type="password" 
                    placeholder="如需修改密码请输入新密码"
                    show-password 
                />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="editForm.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-input v-model="editForm.avatar" placeholder="请输入头像URL" />
            </el-form-item>
            <el-form-item label="个人简介" prop="declaration">
                <el-input 
                    v-model="editForm.declaration" 
                    type="textarea" 
                    :rows="3"
                    placeholder="请输入个人简介" 
                />
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="editForm.address" placeholder="请输入地址" />
            </el-form-item>
            <el-form-item label="职位" prop="position">
                <el-input v-model="editForm.position" placeholder="请输入职位" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="submitEdit" :loading="submitting">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit } from '@element-plus/icons-vue';
import http from '@/axios';
import { myStore } from '@/stores';

// 类型定义
interface UserInfo {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    declaration: string;
    address: string;
    position: string;
}

interface EditForm {
    id: number;
    username: string;
    password: string;
    nickname: string;
    avatar: string;
    declaration: string;
    address: string;
    position: string;
    [key: string]: string | number; // 添加索引签名
}

// 状态定义
const store = myStore();
const userInfo = ref<UserInfo>({
    id: 0,
    username: '',
    nickname: '',
    avatar: '',
    declaration: '',
    address: '',
    position: ''
});
const editDialog = ref(false);
const submitting = ref(false);
const formRef = ref();

// 表单验证规则
const formRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    password: [
        { min: 6, message: '密码长度不能小于6个字符', trigger: 'blur' }
    ],
    nickname: [
        { max: 20, message: '昵称不能超过20个字符', trigger: 'blur' }
    ]
};

const editForm = ref<EditForm>({
    id: 0,
    username: '',
    password: '',
    nickname: '',
    avatar: '',
    declaration: '',
    address: '',
    position: ''
});

// 获取用户信息
const getUserInfo = async () => {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            ElMessage.error('未登录，请先登录');
            return;
        }
        
        // 从token中解析用户信息
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        if (!payload.id) {
            ElMessage.error('token无效，请重新登录');
            return;
        }

        const response = await http.get('user/query', {
            params: { id: payload.id }
        });
        userInfo.value = response.data.data;
    } catch (error) {
        ElMessage.error('获取用户信息失败');
    }
};

// 打开编辑对话框
const editInfo = () => {
    editForm.value = {
        id: userInfo.value.id,
        username: userInfo.value.username,
        password: '',
        nickname: userInfo.value.nickname || '',
        avatar: userInfo.value.avatar || '',
        declaration: userInfo.value.declaration || '',
        address: userInfo.value.address || '',
        position: userInfo.value.position || ''
    };
    editDialog.value = true;
};

// 提交编辑
const submitEdit = async () => {
    if (!formRef.value) return;
    
    try {
        await formRef.value.validate();
        submitting.value = true;
        
        const updateData: any = { id: userInfo.value.id };
        // 只包含已修改的字段
        Object.keys(editForm.value).forEach(key => {
            if (editForm.value[key] && key !== 'id') {
                updateData[key] = editForm.value[key];
            }
        });

        await http.put('user/revise', updateData);
        ElMessage.success('更新成功');
        editDialog.value = false;
        getUserInfo(); // 刷新用户信息
    } catch (error: any) {
        ElMessage.error(error.response?.data?.message || '更新失败');
    } finally {
        submitting.value = false;
    }
};

onMounted(() => {
    getUserInfo();
});
</script>

<style scoped lang="less">
.user-management {
    min-height: 100%;
    padding: 20px;
    background-color: #f5f7fa;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.user-card {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    background-color: #fff;
    flex: 1;
    
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .title {
            font-size: 18px;
            font-weight: bold;
            color: #303133;
        }
    }
}

.user-info {
    display: flex;
    padding: 30px;
    gap: 40px;
    
    .user-avatar {
        flex-shrink: 0;
        border: 2px solid #eee;
        padding: 2px;
        transition: all 0.3s ease;
        
        &:hover {
            transform: scale(1.05);
            border-color: var(--el-color-primary);
        }
    }
    
    .info-content {
        flex: 1;
        
        .info-item {
            margin-bottom: 20px;
            display: flex;
            align-items: baseline;
            
            label {
                font-weight: bold;
                color: #606266;
                min-width: 100px;
            }
            
            span {
                color: #303133;
                flex: 1;
            }
        }
    }
}

.dialog-footer {
    padding-top: 20px;
    border-top: 1px solid #dcdfe6;
}

:deep(.el-form-item__label) {
    font-weight: 500;
}
</style>