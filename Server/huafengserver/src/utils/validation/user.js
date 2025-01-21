"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySchema = exports.reviseSchema = exports.loginSchema = void 0;
exports.verifyAction = verifyAction;
/**
 * 用户相关的数据验证规则
 * 使用Joi库进行请求参数的验证
 */
const joi_1 = __importDefault(require("joi"));
/**
 * 用户登录时的数据验证规则
 * - username: 必填的字符串
 * - password: 必填的字符串
 */
const loginSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.loginSchema = loginSchema;
//修改用户信息
const reviseSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
    username: joi_1.default.string(),
    password: joi_1.default.string(),
    nickname: joi_1.default.string(),
    avatar: joi_1.default.string(),
    declaration: joi_1.default.string(),
    address: joi_1.default.string(),
    position: joi_1.default.string(),
});
exports.reviseSchema = reviseSchema;
//查询用户信息
const querySchema = joi_1.default.object({
    id: joi_1.default.number().required(),
});
exports.querySchema = querySchema;
/**
 * 通用的数据验证函数
 * @param schema Joi验证模式
 * @param data 待验证的数据
 * @throws Error 当验证失败时抛出错误
 * @returns 验证通过的数据
 */
function verifyAction(schema, data) {
    const { error, value } = schema.validate(data);
    if (error) {
        throw new Error(`校验失败: ${error.details[0].message}`);
    }
    return value;
}
