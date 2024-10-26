# myWeb-huafeng

## 本地预览
 网页：http://localhost:5174/huafeng/
 管理员面板：http://localhost:5173/admin/
 后端服务：http://localhost:3000

## 接口文档
https://apifox.com/apidoc/shared-df03ec93-e775-4686-9baf-a8423402c00b/api-212903383

## clientDir（前端）
语言：TypeScript
框架：Vue3
组件库：ElementPlus

## serverDir（后端）
语言：TypeScript
框架：Koa

## othe（其他）
环境：Node.js
数据库：MySQL

## 目录结构
clientDir/：客户端
- adminLinterface/：管理员面板（后台管理）
    - assets/：全局样式
    - axios/：axios配置
    - coponent/：组件
    - router/：路由配置
    - stores/：pinia配置
    - views/：视图、页面
    - APP.vue
    - custom-type.d.ts && wangeditor-types.d.ts :wangeditor富文本配置

- userInterface/：用户界面
    - 同上

serverDir/：服务端
- src/：
    - controllers/: 业务逻辑
    - models/：数据库操作
        - entity/： 数据库模型
    - routes/: 路由
    - utils/: 工具函数
        - validation/：参数校验规则
        - jwt.ts ：jwt配置
        - tokenAuth ：token校验
    - app.ts
- data-source.ts：数据库配置
