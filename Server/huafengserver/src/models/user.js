"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataService = void 0;
/**
 * 用户相关的数据库操作服务
 * 包含用户的增删改查等基本操作
 */
const data_source_1 = require("../data-source");
const userEntity_1 = require("./entity/userEntity");
/**
 * 用户数据服务类
 * 处理所有与用户相关的数据库操作
 */
class UserDataService {
    /**
     * 初始化管理员账号
     * 如果数据库中没有用户，则创建默认管理员账号
     */
    initAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userEntity_1.User);
            const count = yield userRepository.count();
            if (count === 0) {
                const admin = userRepository.create({
                    username: 'huafengAdmin',
                    password: 'ooo000---'
                });
                yield userRepository.save(admin);
            }
        });
    }
    /**
     * 用户登录验证
     * @param value 包含登录信息的对象（username, password）
     * @throws Error 当用户未找到或密码错误时抛出错误
     * @returns Promise<User> 返回用户信息
     */
    potLogin(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userEntity_1.User);
            const waitPutUser = yield userRepository.findOneBy({ username: value.username });
            if (waitPutUser) {
                if (waitPutUser.password == value.password) {
                    return waitPutUser;
                }
                else {
                    throw new Error('密码错误');
                }
            }
            else {
                throw new Error('用户未找到');
            }
        });
    }
    //修改用户信息
    reviseUser(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userEntity_1.User);
            const waitPutUser = yield userRepository.findOneBy({ id: value.id });
            if (waitPutUser) {
                waitPutUser.username = value.username;
                waitPutUser.password = value.password;
                waitPutUser.nickname = value.nickname;
                waitPutUser.avatar = value.avatar;
                waitPutUser.declaration = value.declaration;
                waitPutUser.address = value.address;
                waitPutUser.position = value.position;
                yield userRepository.save(waitPutUser);
            }
            else {
                throw new Error('用户未找到');
            }
        });
    }
    //查询用户信息
    queryUser(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userEntity_1.User);
            const waitPutUser = yield userRepository.findOneBy({ id: value.id });
            if (waitPutUser) {
                return waitPutUser;
            }
            else {
                throw new Error('用户未找到');
            }
        });
    }
}
exports.UserDataService = UserDataService;
