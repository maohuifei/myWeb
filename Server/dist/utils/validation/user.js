"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = exports.getUserSchema = exports.deleteUserSchema = exports.updateUserSchema = exports.addUserSchema = void 0;
exports.verifyAction = verifyAction;
const joi_1 = __importDefault(require("joi"));
const addUserSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    categoryId: joi_1.default.number()
});
exports.addUserSchema = addUserSchema;
const updateUserSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    categoryId: joi_1.default.number()
});
exports.updateUserSchema = updateUserSchema;
const deleteUserSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required()
});
exports.deleteUserSchema = deleteUserSchema;
const getUserSchema = joi_1.default.object({
    id: joi_1.default.number().integer(),
    username: joi_1.default.string(),
    categoryId: joi_1.default.number(),
    page: joi_1.default.number().integer().required(),
    pageSize: joi_1.default.number().integer().required(),
});
exports.getUserSchema = getUserSchema;
const loginSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.loginSchema = loginSchema;
const registerSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.registerSchema = registerSchema;
//校验行为
function verifyAction(schema, data) {
    const { error, value } = schema.validate(data);
    if (error) {
        throw new Error(`校验失败: ${error.details[0].message}`);
    }
    return value;
}
