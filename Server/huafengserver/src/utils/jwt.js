"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
/**
 * JWT（JSON Web Token）工具模块
 * 用于生成和验证用户认证令牌
 */
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
// 加载环境变量
dotenv.config();
/**
 * JWT密钥
 * 用于签名和验证token
 * 注意：在实际生产环境中，这个密钥应该存储在环境变量中
 */
const secret = 'JWThuafeng991((!';
/**
 * JWT配置选项
 * - expiresIn: token的有效期
 */
const options = {
    expiresIn: '1h' // token有效期为1小时
};
/**
 * 生成JWT token
 * @param id 用户ID
 * @param username 用户名
 * @param password 用户密码
 * @returns 生成的JWT token字符串
 */
function signToken(id, username, password) {
    // 创建token的负载（payload）
    const payload = { id: id, username: username, password: password };
    // 使用密钥和选项生成token
    return jwt.sign(payload, secret, options);
}
/**
 * 验证JWT token
 * @param token 要验证的token字符串
 * @returns 如果验证成功返回解码后的payload，失败返回null
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    }
    catch (err) {
        return null;
    }
}
