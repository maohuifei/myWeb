import Joi from 'joi'

const addUserSchema = Joi.object({
    name: Joi.string().required(),
    pass: Joi.string().required(),
    category: Joi.string()
});
const updateUserSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    pass: Joi.string().required(),
    category: Joi.string()
});

const deleteUserSchema = Joi.object({
    id: Joi.number().integer().required()
});

const getUserSchema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string(),
    category: Joi.string(),
    page: Joi.number().integer().required(),
    pageSize: Joi.number().integer().required(),
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
    verifyAction
}