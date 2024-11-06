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
exports.ArticleDataService = void 0;
const data_source_1 = require("../data-source");
const articleEntity_1 = require("./entity/articleEntity");
class ArticleDataService {
    //添加/新建文章
    addArticle(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const articleRepository = data_source_1.AppDataSource.getRepository(articleEntity_1.Article);
            const newArticle = articleRepository.create(value);
            yield articleRepository.save(newArticle);
        });
    }
    //根据id删除文章
    delArticle(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const articleRepository = data_source_1.AppDataSource.getRepository(articleEntity_1.Article);
            const waitDelArticle = yield articleRepository.findOneBy({ id: value.id });
            if (waitDelArticle) {
                yield articleRepository.remove(waitDelArticle);
            }
            else {
                throw new Error('文章未找到');
            }
        });
    }
    //修改文章
    putArticle(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const articleRepository = data_source_1.AppDataSource.getRepository(articleEntity_1.Article);
            const waitPutArticle = yield articleRepository.findOneBy({ id: value.id });
            if (waitPutArticle) {
                waitPutArticle.title = value.title;
                waitPutArticle.content = value.content;
                waitPutArticle.categoryId = value.categoryId;
                waitPutArticle.abstract = value.abstract;
                waitPutArticle.recommend = value.recommend;
                waitPutArticle.state = value.state;
                yield articleRepository.save(waitPutArticle);
            }
            else {
                throw new Error('文章未找到');
            }
        });
    }
    //获取文章列表 
    getArticle(value) {
        return __awaiter(this, void 0, void 0, function* () {
            //定义返回字段格式
            const ARTICLE_SELECT_FIELDS = [
                'article.id',
                'article.title',
                'article.abstract',
                'article.categoryId',
                'article.recommend',
                'article.state',
                'article.created_at',
                'article.updated_at'
            ];
            const articleRepository = data_source_1.AppDataSource.getRepository(articleEntity_1.Article);
            const { page, pageSize, state, recommend, categoryId } = value;
            const skip = (page - 1) * pageSize;
            let queryBuilder = articleRepository.createQueryBuilder('article')
                .select(ARTICLE_SELECT_FIELDS)
                .skip(skip)
                .take(pageSize);
            ///根据文章是否上架状查询列表
            if (state !== undefined) {
                queryBuilder = queryBuilder.andWhere('article.state = :state', { state: state });
            }
            //根据文章是否推荐查询列表
            if (recommend !== undefined) {
                queryBuilder = queryBuilder.andWhere('article.recommend = :recommend', { recommend: recommend });
            }
            //根据文章类别id查询列表
            if (categoryId !== undefined) {
                queryBuilder = queryBuilder.andWhere('article.categoryId = :categoryId', { categoryId: categoryId });
            }
            const [articlelist, totalCount] = yield queryBuilder
                .getManyAndCount(); // 使用 getManyAndCount 方法同时获取结果和总数  
            return { articlelist, totalCount };
        });
    }
    //根据文章id获取文章内容
    getArticleContent(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const articleRepository = data_source_1.AppDataSource.getRepository(articleEntity_1.Article);
            const waitGetArticleContent = yield articleRepository.findOneBy({ id: value.id });
            if (waitGetArticleContent) {
                return waitGetArticleContent;
            }
            else {
                throw new Error('文章未找到');
            }
        });
    }
}
exports.ArticleDataService = ArticleDataService;
