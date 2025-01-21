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
exports.CategoriesDataService = void 0;
const data_source_1 = require("../data-source");
const categoriesEntity_1 = require("./entity/categoriesEntity");
class CategoriesDataService {
    addCategories(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoriesRepository = data_source_1.AppDataSource.getRepository(categoriesEntity_1.Categories);
            const newCategories = categoriesRepository.create(value);
            yield categoriesRepository.save(newCategories);
        });
    }
    delCategories(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoriesRepository = data_source_1.AppDataSource.getRepository(categoriesEntity_1.Categories);
            const waitDelCategories = yield categoriesRepository.findOneBy({ id: value.id });
            if (waitDelCategories) {
                yield categoriesRepository.remove(waitDelCategories);
            }
            else {
                throw new Error('配置未找到');
            }
        });
    }
    getCategories(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoriesRepository = data_source_1.AppDataSource.getRepository(categoriesEntity_1.Categories);
            const categories = yield categoriesRepository.find({
                where: { type: value.type }
            });
            if (categories.length > 0) {
                return categories;
            }
            else {
                throw new Error('没有找到符合条件的系统');
            }
        });
    }
}
exports.CategoriesDataService = CategoriesDataService;
