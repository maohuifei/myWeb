import Router from 'koa-router';
import Joi from 'joi';
import { AppDataSource } from '../../data-source'; // 导入 DataSource 实例
import { User } from '../entity/User'; // 导入 User 实体

const router = new Router({
    prefix: '/user'
});

const addUserSchema = Joi.object({
    name: Joi.string().required(),
    pass: Joi.string().required()
});
const updateUserSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    pass: Joi.string().required()
});
const deleteUserSchema = Joi.object({
    id: Joi.number().integer().required()
});

// 增
router.post('/add', async (ctx) => {
    const { error, value } = addUserSchema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400;
        ctx.body = { error: error.details[0].message };
        return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create(value);
    await userRepository.save(newUser);
    ctx.body = "add user success";
});

// 删
router.delete('/delete/:id', async (ctx) => {
    const { error, value } = deleteUserSchema.validate({ id: parseInt(ctx.params.id) });
    if (error) {
        ctx.status = 400;
        ctx.body = { error: error.details[0].message };
        return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const userToRemove = await userRepository.findOneBy({ id: value.id });
    if (userToRemove) {
        await userRepository.remove(userToRemove);
        ctx.body = `delete user: ${value.id} success`;
    } else {
        ctx.status = 404;
        ctx.body = "no user";
    }
});

// 改
router.put('/put', async (ctx) => {
    const { error, value } = updateUserSchema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400;
        ctx.body = { error: error.details[0].message };
        return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const userToUpdate = await userRepository.findOneBy({ id: value.id });
    if (userToUpdate) {
        userToUpdate.name = value.name;
        userToUpdate.pass = value.pass;
        await userRepository.save(userToUpdate);
        ctx.body = "put user success";
    } else {
        ctx.status = 404;
        ctx.body = "no user";
    }
});

// 查
router.get('/list', async (ctx) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    ctx.body = users;
});

export default router;

// import Router from 'koa-router'
// import Joi from 'joi'

// const router = new Router({
//     prefix: '/user'
// })

// const userList = [{
//     id: 1,
//     name: "zhangsan",
//     pass: "333"
// }, {
//     id: 2,
//     name: "lisi",
//     pass: "444"
// }]

// const addUserSchema = Joi.object({
//     id: Joi.number().integer().required(),
//     name: Joi.string().required(),
//     pass: Joi.string().required()
// });
// const updateUserSchema = Joi.object({
//     newId: Joi.number().integer().required(),
//     newName: Joi.string().required(),
//     newPass: Joi.string().required()
// });

// const deleteUserSchema = Joi.object({
//     id: Joi.number().integer().required()
// });

// //增
// router.post('/add', async (ctx) => {
//     const { error, value } = addUserSchema.validate(ctx.request.body);
//     if (error) {
//       ctx.status = 400;
//       ctx.body = { error: error.details[0].message };
//       return;
//     }
//     userList.push(value);
//     ctx.body = "add user success";
// })
// //删
// router.delete('/delete/:id', async (ctx) => {
//     const { error, value } = deleteUserSchema.validate({ id: parseInt(ctx.params.id) });
//     if (error) {
//       ctx.status = 400;
//       ctx.body = { error: error.details[0].message };
//       return;
//     }
//     const delId = value.id;
//     const index = userList.findIndex(user => user.id === delId);
//     if (index !== -1) {
//       userList.splice(index, 1);
//       ctx.body = `delete user: ${delId} success`;
//     } else {
//       ctx.status = 404;
//       ctx.body = "no user";
//     }
//   });
  
// //改
// router.put('/put', async (ctx) => {
//     const { error, value } = updateUserSchema.validate(ctx.request.body);
//     if (error) {
//       ctx.status = 400;
//       ctx.body = { error: error.details[0].message };
//       return;
//     }
  
//     const { newId, newName, newPass } = value;
//     const index = userList.findIndex(user => user.id === newId);
//     if (index !== -1) {
//       userList[index] = { id: newId, name: newName, pass: newPass };
//       ctx.body = "put user success";
//     } else {
//       ctx.status = 404;
//       ctx.body = "no user";
//     }
//   });
// //查
// router.get('/list', async (ctx) => {
//     ctx.body = userList
// })

// export default router