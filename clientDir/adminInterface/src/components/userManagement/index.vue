<template>
    <div class="article_box">
        <!-- <h1 class="title_class">用户管理</h1> -->
        <el-button type="success" @click="userUperation()">新增用户</el-button>
        <el-table :data="tableData" height="530" :style="{ width: '100%' }">
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
            <el-select v-model="userinfo.categoryId" placeholder="请选择用户类别" size="large" @change="selectGroupKeyFun">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
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
            getUserList()
        })
        // const options = ref()
        const stores = myStore()//商店实例化
        const newuseerwin = ref(false);//弹窗开关状态
        const newUserTitle = ref("")//弹窗标题
        const totalCount = ref(0)//数据总条数
        const parameter = ref({//分页
            page: 1,
            pageSize: 10
        })
        const userinfo = ref({//用户信息
            id: 0,
            username: "",
            password: "",
            categoryId: 0
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
                        categoryId: 0
                    }
            } else {
                    userinfo.value.id=value.id
                    userinfo.value.username=value.username
                    userinfo.value.password=value.password
                    userinfo.value.categoryId=value.categoryId
                      newuseerwin.value = true,
                    newUserTitle.value = '编辑用户'
            }
        }
        const delUser = async (value: any) => {
            try {
                await http.delete(`user/delete/${value.id}`)
                newuseerwin.value = false
                ElMessage({
                    message: '删除用户成功',
                    type: 'success',
                })
                getUserList()
            } catch (error) {
                ElMessage.error('删除用户失败')
            }
        }
        //修改用户请求
        const putUser = async () => {
            try {
                await http.put('user/put', userinfo.value)
                newuseerwin.value = false
                ElMessage({
                    message: '修改用户成功',
                    type: 'success',
                })
                getUserList()
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
                    categoryId: userinfo.value.categoryId,
                }
                await http.post('user/add', dataToSend)
                newuseerwin.value = false
                ElMessage({
                    message: '添加用户成功',
                    type: 'success',
                })
                getUserList()
            } catch (error) {
                ElMessage.error('添加用户失败')
            }

        }
        const userList = ref([])
        //获取用户列表请求
        const getUserList = async () => {
            const getData = await http.get('user/list', {
                params: parameter.value
            })
            userList.value = getData.data.data
            totalCount.value = getData.data.data.totalCount
            console.log("获取用户列表",userList.value);
            getConfigurationList()
        }
        const categoryList=ref([])
        //获取用户类别列表
        const getConfigurationList = async () => {
            const response = await http.get('categories/list', { params: { type: "用户分类" } })
            categoryList.value = response.data.data
            console.log("获取用户类别列表",categoryList.value);
            // options.value = response.data.data
            updateCategoryNames()
        }
        const tableData=ref([])//现实的表格数据
        const updateCategoryNames = () => {
            tableData.value=userList.value
            // 遍历 articleList 中的每一项  
            tableData.value.forEach(user => {
                // 尝试在 categoryList 中找到与 article.categoryId 相匹配的对象  
                const category = categoryList.value.find(cat => cat.id === user.categoryId);

                // 如果找到了匹配的对象，就更新 article 的 category 属性  
                if (category) {
                    // 这里我们假设 article 对象是可以直接修改的（即它不是通过某些不可变数据处理库创建的）  
                    // 如果 article 是不可变的，你需要使用相应的方法来更新它  
                    user.category = category.name;
                } else {
                    // 如果没有找到匹配的对象，你可以选择设置一个默认值，或者不做任何操作  
                    // 例如，你可以将 article.category 设置为 null 或 ''（空字符串）  
                    user.category = "未分类"; // 如果需要的话，取消注释这行代码  
                }
            });
            console.log("替换后的data",tableData.value);
        };
        const selectGroupKeyFun = (value: any) => {
            userinfo.value.categoryId = value
        }
           //分页按钮的触发事件
           const handleCurrentChange = async (value: number) => {
            parameter.value.page = value
            getUserList()
        };
        return {
            updateCategoryNames,
            categoryList,
            // options,
            newUserTitle,
            userUperation,
            newuseerwin,
            userinfo,
            getUserList,
            tableData,
            userList,
            handleCurrentChange,
            totalCount,
            parameter,
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