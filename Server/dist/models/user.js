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
const data_source_1 = require("../data-source");
const userEntity_1 = require("./entity/userEntity");
class UserDataService {
    addUser(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userEntity_1.User);
            const newUser = userRepository.create(value);
            yield userRepository.save(newUser);
        });
    }
    delUser(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userEntity_1.User);
            const waitDelUser = yield userRepository.findOneBy({ id: value.id });
            if (waitDelUser) {
                yield userRepository.remove(waitDelUser);
            }
            else {
                throw new Error('用户未找到');
            }
        });
    }
    putUser(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userEntity_1.User);
            const waitPutUser = yield userRepository.findOneBy({ id: value.id });
            if (waitPutUser) {
                waitPutUser.username = value.username;
                waitPutUser.password = value.password;
                waitPutUser.categoryId = value.categoryId;
                yield userRepository.save(waitPutUser);
            }
            else {
                throw new Error('用户未找到');
            }
        });
    }
    getUser(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(userEntity_1.User);
            const { page, pageSize } = value;
            const skip = (page - 1) * pageSize;
            const userlist = yield userRepository.createQueryBuilder('user')
                .skip(skip) // 跳过指定数量的记录  
                .take(pageSize) // 获取指定数量的记录  
                .getMany(); // 执行查询并获取结果  
            // 如果需要，还可以计算总记录数（用于分页控件等）  
            const totalCount = yield userRepository.count();
            return { userlist, totalCount };
        });
    }
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
}
exports.UserDataService = UserDataService;
