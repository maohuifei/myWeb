import Joi from 'joi'

const addUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    categoryId: Joi.number()
});
const updateUserSchema = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    categoryId: Joi.number()
});

const deleteUserSchema = Joi.object({
    id: Joi.number().integer().required()
});

const getUserSchema = Joi.object({
    id: Joi.number().integer(),
    username: Joi.string(),
    categoryId: Joi.number(),
    page: Joi.number().integer().required(),
    pageSize: Joi.number().integer().required(),
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

//校验行为
function verifyAction(schema:Joi.Schema,data:any){
    const {error,value}=schema.validate(data)
    if(error){
        throw new Error(`校验失败: ${error.details[0].message}`);
    }
    return value
}

export {
    addUserSchema,
    updateUserSchema,
    deleteUserSchema,
    getUserSchema,
    verifyAction,
    loginSchema,
    registerSchema,
}