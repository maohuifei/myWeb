"use strict";
// 类别表
// id：类别id；主键，自增
// name：类别名称；
// type：类别类型；
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategoriesSchema = exports.delCategoriesSchema = exports.getCategoriesSchema = void 0;
exports.verifyAction = verifyAction;
const joi_1 = __importDefault(require("joi"));
//获取列表
const getCategoriesSchema = joi_1.default.object({
    id: joi_1.default.number().integer(),
    name: joi_1.default.string(),
    type: joi_1.default.string(),
});
exports.getCategoriesSchema = getCategoriesSchema;
//根据id删除类别
const delCategoriesSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
});
exports.delCategoriesSchema = delCategoriesSchema;
//新增类别
const addCategoriesSchema = joi_1.default.object({
    id: joi_1.default.number().integer(),
    name: joi_1.default.string(),
    type: joi_1.default.string(),
});
exports.addCategoriesSchema = addCategoriesSchema;
//校验行为
function verifyAction(schema, data) {
    const { error, value } = schema.validate(data);
    if (error) {
        throw new Error(`校验失败: ${error.details[0].message}`);
    }
    return value;
}
