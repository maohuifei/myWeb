# myWeb-huafeng
## clientDir
语言：TypeScript
框架：Vue3
组件库：ElementPlus
其他组件：
· "@wangeditor/editor": "^5.1.23"（富文本）

## serverDir
语言：TypeScript
框架：Koa
其他组件：


## othe
环境：Node.js
数据库：MySQL

## 目录结构
controllers/: 包含处理请求的控制器。每个控制器通常对应一个或多个路由。
middleware/: 自定义中间件函数目录。你可以在这里定义所有自定义的中间件。
models/: 数据模型文件。如果你使用了数据库，这里会包含数据库模型定义。
routes/: 路由定义文件。在这里你可以定义应用的所有路由。
services/: 包含业务逻辑和服务层的代码。这些服务通常与控制器和模型交互。
utils/: 实用工具函数和帮助函数。