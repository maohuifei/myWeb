import Joi from 'joi'

const addArticleSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
});
const putArticleSchema = Joi.object({
    id: Joi.number().integer().required(),
    title: Joi.string(),
    content: Joi.string(),
    category: Joi.string(),
});

const delArticleSchema = Joi.object({
    id: Joi.number().integer().required()
});

const getArticleSchema = Joi.object({
    id: Joi.number().integer(),
    title: Joi.string(),
    category: Joi.string(),
    page: Joi.number().integer().required(),
    pageSize: Joi.number().integer().required(),
});

const getArticleContentSchema = Joi.object({
    id: Joi.number().integer().required(),
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
    addArticleSchema,
    putArticleSchema,
    delArticleSchema,
    getArticleSchema,
    getArticleContentSchema,
    verifyAction
}