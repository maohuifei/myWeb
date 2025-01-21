"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleContentSchema = exports.getArticleSchema = exports.delArticleSchema = exports.putArticleSchema = exports.addArticleSchema = void 0;
exports.verifyAction = verifyAction;
const joi_1 = __importDefault(require("joi"));
const addArticleSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string(),
    categoryId: joi_1.default.number().required(),
    abstract: joi_1.default.string(),
    recommend: joi_1.default.boolean(),
    state: joi_1.default.boolean(),
});
exports.addArticleSchema = addArticleSchema;
const putArticleSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    title: joi_1.default.string(),
    content: joi_1.default.string(),
    categoryId: joi_1.default.number(),
    abstract: joi_1.default.string(),
    recommend: joi_1.default.boolean(),
    state: joi_1.default.boolean(),
});
exports.putArticleSchema = putArticleSchema;
const delArticleSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required()
});
exports.delArticleSchema = delArticleSchema;
const getArticleSchema = joi_1.default.object({
    id: joi_1.default.number().integer(),
    title: joi_1.default.string(),
    categoryId: joi_1.default.number(),
    recommend: joi_1.default.boolean(),
    state: joi_1.default.boolean(),
    page: joi_1.default.number().integer().required(),
    pageSize: joi_1.default.number().integer().required(),
});
exports.getArticleSchema = getArticleSchema;
const getArticleContentSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
});
exports.getArticleContentSchema = getArticleContentSchema;
//校验行为
function verifyAction(schema, data) {
    const { error, value } = schema.validate(data);
    if (error) {
        throw new Error(`校验失败: ${error.details[0].message}`);
    }
    return value;
}
