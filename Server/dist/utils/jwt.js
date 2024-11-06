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
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// 密钥（secret）  
const secret = 'JWThuafeng991((!'; // 在实际应用中，这应该是一个保密的密钥  
// 选项  
const options = {
    expiresIn: '1h' // 设置令牌有效期为 1 小时  
};
function signToken(id, username, password) {
    // 负载（payload）  
    const payload = { id: id, username: username, password: password };
    return jwt.sign(payload, secret, options);
}
function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    }
    catch (err) {
        return null;
    }
}
