<template>
    <div class="article_box">
        <!-- <h1 class="title_class">用户管理</h1> -->
        <el-button type="success" @click="userUperation()">新增用户</el-button>
        <el-table :data="userList" height="530" :style="{ width: '100%' }">
            <el-table-column prop="name" label="用户名" />
            <el-table-column prop="category" label="类别" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="userUperation(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="delUser(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pag_class" background @current-change="handleCurrentChange" :current-page="parameter.page"
            :page-size="parameter.pageSize" layout="prev, pager, next" :total="totalCount" />
    </div>
    <el-dialog v-model="newuseerwin" :title="newUserTitle">
        <div>
            <el-input v-model="userinfo.name" placeholder="请输入用户名" />
            <el-input v-model="userinfo.pass" placeholder="请输入密码" />
            <el-input v-model="userinfo.category" placeholder="请输入用户类别" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newuseerwin = false">取消</el-button>
                <el-button type="primary" @click="yesBtn"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue';
import { ref, onMounted } from 'vue';
import { myStore } from '@/stores'
import { ElMessage } from 'element-plus'


export default {
    setup() {
        const stores = myStore()//商店实例化
        const newuseerwin = ref(false);//弹窗开关状态
        const newUserTitle = ref("")//弹窗标题
        const userList = ref(null)//用户列表
        const totalCount = ref(0)//数据总条数
        const parameter = ref({//分页
            page: 1,
            pageSize: 10
        })
        const userinfo = ref({//用户信息
            id: 0,
            name: "",
            pass: "",
            category: ""
        })
        //弹出框-确认按钮事件
        const yesBtn = () => {
            if (newUserTitle.value == '新增用户') {
                addUser()
            } else {
                putUser()
            }
        }
        //根据点击哪个按钮，判断弹出框标题
        const userUperation = (value?) => {
            if (!value) {
                newuseerwin.value = true,
                    newUserTitle.value = '新增用户',
                    userinfo.value = {//用户信息
                        id: 0,
                        name: "",
                        pass: "",
                        category: ""
                    }
            } else {
                userinfo.value = value
                newuseerwin.value = true,
                    newUserTitle.value = '编辑用户'
                userinfo.value = value
            }
        }
        const delUser = async (value) => {
            const result = await stores.delDataToServer('user/delete', value.id)
            try {
                // const result=await stores.delDataToServer('user/del',value.id)
                newuseerwin.value = false
                ElMessage({
                    message: '删除用户成功',
                    type: 'success',
                })
                getUser()
            } catch (error) {
                ElMessage.error('删除用户失败')
            }
        }
        //修改用户请求
        const putUser = async () => {
            try {
                const result = await stores.putDataToServer('user/put', userinfo.value)
                newuseerwin.value = false
                ElMessage({
                    message: '修改用户成功',
                    type: 'success',
                })
                getUser()
            } catch (error) {
                ElMessage.error('添加用户失败')
            }
        }
        //添加用户请求
        const addUser = async () => {
            //清除表单缓存
            try {
                const dataToSend = {
                    name: userinfo.value.name,
                    pass: userinfo.value.pass,
                    category: userinfo.value.category,
                }
                const result = await stores.addDataToServer('user/add', dataToSend)
                newuseerwin.value = false
                ElMessage({
                    message: '添加用户成功',
                    type: 'success',
                })
                getUser()
            } catch (error) {
                ElMessage.error('添加用户失败')
            }

        }
        //获取用户列表请求
        const getUser = async () => {
            const getData = await stores.getDataToServer('user/list', parameter.value)
            userList.value = getData.data
            totalCount.value = getData.totalCount
            console.log(getData)
        }
        //页面挂载执行
        onMounted(async () => {
            getUser()
        })
        //分页按钮的触发事件
        const handleCurrentChange = async (value: number) => {
            parameter.value.page = value
            getUser()
        };

        const username = ref('');
        const category = ref('');
        return {
            newUserTitle,
            userUperation,
            newuseerwin,
            userinfo,
            userList,
            handleCurrentChange,
            totalCount,
            parameter,
            getUser,
            addUser,
            putUser,
            delUser,
            yesBtn
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