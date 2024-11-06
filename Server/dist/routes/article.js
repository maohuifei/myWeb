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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const article_1 = require("../controllers/article");
const router = new koa_router_1.default({
    prefix: '/api/article'
});
//增
router.post('/add', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, article_1.articleAdd)(ctx);
}));
//删
router.delete('/delete/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, article_1.articleDel)(ctx);
}));
//改
router.put('/put', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, article_1.articlePut)(ctx);
}));
//查
router.get('/list', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, article_1.articleGet)(ctx);
}));
//获取单个文章内容
router.get('/content', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, article_1.articleContentGet)(ctx);
}));
exports.default = router;
