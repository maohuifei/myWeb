<template>
    <div class="article_box">
        <!-- <h1 class="title_class">用户管理</h1> -->
        <el-button type="success" @click="userUperation()">新增用户</el-button>
        <el-table :data="userList" height="530" :style="{ width: '100%' }">
            <el-table-column prop="username" label="用户名" />
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
            <el-input v-model="userinfo.username" placeholder="请输入用户名" />
            <el-input v-model="userinfo.password" placeholder="请输入密码" />
            <el-select v-model="userinfo.category" placeholder="请选择用户类别" size="large" @change="selectGroupKeyFun">
                <el-option v-for="item in options" :key="item.id" :label="item.username" :value="item.username" />
            </el-select>
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
import { ref, onMounted } from 'vue';
import { myStore } from '@/stores'
import { ElMessage } from 'element-plus'
import http from '@/axios'

export default {
    setup() {
        //页面挂载执行
        onMounted(async () => {
            getUser()
        })
        const options=ref()
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
            username: "",
            password: "",
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
        const userUperation = (value?: any) => {
            getConfigurationList()
            if (!value) {
                newuseerwin.value = true,
                    newUserTitle.value = '新增用户',
                    userinfo.value = {//用户信息
                        id: 0,
                        username: "",
                        password: "",
                        category: ""
                    }
            } else {
                userinfo.value = value
                newuseerwin.value = true,
                    newUserTitle.value = '编辑用户'
                userinfo.value = value
            }
        }
        const delUser = async (value: any) => {
            try {
                await stores.delDataToServer('user/delete', value.id)
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
                await stores.putDataToServer('user/put', userinfo.value)
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
                    username: userinfo.value.username,
                    password: userinfo.value.password,
                    category: userinfo.value.category,
                }
                await stores.postDataToServer('user/add', dataToSend)
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
            // const getData = await stores.getDataToServer('user/list', parameter.value)
            // console.log(localStorage.getItem('auth_token'));
            const getData=await http.get('user/list', {
                params:parameter.value
            })
            userList.value = getData.data
            totalCount.value = getData.data.totalCount
            console.log("get的数据：",getData)
        }

        //分页按钮的触发事件
        const handleCurrentChange = async (value: number) => {
            parameter.value.page = value
            getUser()
        };
        const getConfigurationList = async () => {
            const response = await stores.getDataToServer('configuration/list', {type:"user_category"})
            options.value=response.data
        }
        const selectGroupKeyFun=(value:any)=>{
            userinfo.value.category=value
        }
        return {
            options,
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
            yesBtn,
            getConfigurationList,
            selectGroupKeyFun,
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