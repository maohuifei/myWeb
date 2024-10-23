import { AppDataSource } from '../../data-source'
import { Article } from './entity/articleEntity'

export class ArticleDataService {
    async addArticle(value: any) {
        const articleRepository = AppDataSource.getRepository(Article)
        const newUser = articleRepository.create(value)
        await articleRepository.save(newUser)
    }

    async delArticle(value: any) {
        const articleRepository = AppDataSource.getRepository(Article)
        const waitDelUser = await articleRepository.findOneBy({ id: value.id })
        if (waitDelUser) {
            await articleRepository.remove(waitDelUser)
        } else {
            throw new Error('文章未找到');
        }
    }
    async putArticle(value: any) {
        const articleRepository = AppDataSource.getRepository(Article)
        const waitPutArticle = await articleRepository.findOneBy({ id: value.id })
        if (waitPutArticle) {
            waitPutArticle.title = value.title
            waitPutArticle.content = value.content
            waitPutArticle.categoryId = value.categoryId
            waitPutArticle.abstract = value.abstract
            waitPutArticle.recommend = value.recommend
            waitPutArticle.state = value.state
            await articleRepository.save(waitPutArticle)
        } else {
            throw new Error('文章未找到');
        }
    }
    async getArticle(value: any) {
        const articleRepository = AppDataSource.getRepository(Article)
        const { page, pageSize, state ,recommend} = value;
        const skip = (page - 1) * pageSize;
        if (state) {
            const articlelist = await articleRepository.createQueryBuilder('article')
                .where('article.state = :state', { state: state })
                .skip(skip) // 跳过指定数量的记录  
                .take(pageSize) // 获取指定数量的记录  
                .getMany(); // 执行查询并获
            // 如果需要，还可以计算总记录数（用于分页控件等）  
            const totalCount = await articleRepository.count();
            return { articlelist, totalCount }
        } else if(recommend){
            const articlelist = await articleRepository.createQueryBuilder('article')
            .where('article.recommend = :recommend', { recommend: recommend })
            .skip(skip) // 跳过指定数量的记录  
            .take(pageSize) // 获取指定数量的记录  
            .getMany(); // 执行查询并获
        // 如果需要，还可以计算总记录数（用于分页控件等）  
        const totalCount = await articleRepository.count();
        return { articlelist, totalCount }
        }
        else {
            const articlelist = await articleRepository.createQueryBuilder('article')
                .skip(skip) // 跳过指定数量的记录  
                .take(pageSize) // 获取指定数量的记录  
                .getMany(); // 执行查询并获
            // 如果需要，还可以计算总记录数（用于分页控件等）  
            const totalCount = await articleRepository.count();
            return { articlelist, totalCount }
        }


    }
    async getArticleContent(value: any) {
        const articleRepository = AppDataSource.getRepository(Article)
        const waitGetArticleContent = await articleRepository.findOneBy({ id: value.id })
        if (waitGetArticleContent) {
            return waitGetArticleContent
        } else {
            throw new Error('文章未找到');
        }
    }
}