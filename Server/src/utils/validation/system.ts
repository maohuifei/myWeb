import Joi from "joi";

const getSystemSchema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string(),
    value: Joi.string(),
    type: Joi.string().valid('user_category', 'article_category', 'system_menu'),
    typeName: Joi.string(),
});
const delSystemSchema = Joi.object({
    id: Joi.number().integer().required(),
});
const addSystemSchema = Joi.object({
    name: Joi.string().required(),
    value: Joi.string(),
    type: Joi.string().valid('user_category', 'article_category', 'system_menu').required(),
    typeName: Joi.string(),
});

//校验行为
function verifyAction(schema: Joi.Schema, data: any) {
    const { error, value } = schema.validate(data)
    if (error) {
        throw new Error(`校验失败: ${error.details[0].message}`);
    }
    return value
}

export {
    getSystemSchema,
    delSystemSchema,
    addSystemSchema,
    verifyAction
}