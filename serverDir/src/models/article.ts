import { AppDataSource } from '../../data-source'
import { Article } from './entity/articleEntity'

export class ArticleDataService{
    async addArticle(value:any){
        const articleRepository = AppDataSource.getRepository(Article)
        const newUser = articleRepository.create(value)
        await articleRepository.save(newUser)
    }

    async delArticle(value:any){
        const articleRepository = AppDataSource.getRepository(Article)
        const waitDelUser = await articleRepository.findOneBy({ id: value.id })
        if(waitDelUser){
            await articleRepository.remove(waitDelUser)
        }else{
            throw new Error('文章未找到');
        }
    }
    async putArticle(value:any){
        const articleRepository = AppDataSource.getRepository(Article)
        const waitPutArticle = await articleRepository.findOneBy({ id: value.id })
        if (waitPutArticle) {
            waitPutArticle.title = value.title
            waitPutArticle.content = value.content
            waitPutArticle.category = value.category
            await articleRepository.save(waitPutArticle)
        }else{
            throw new Error('文章未找到');
        }
    }
    async getArticle(value:any){
        const articleRepository = AppDataSource.getRepository(Article)
        const { page, pageSize } = value;  
        const skip = (page - 1) * pageSize;  
        const articlelist = await articleRepository.createQueryBuilder('user')  
      .skip(skip) // 跳过指定数量的记录  
      .take(pageSize) // 获取指定数量的记录  
      .getMany(); // 执行查询并获取结果  
  
    // 如果需要，还可以计算总记录数（用于分页控件等）  
        const totalCount = await articleRepository.count();
        return {articlelist,totalCount}
    }
    async getArticleContent(value:any){
        const articleRepository = AppDataSource.getRepository(Article)
        const waitGetArticleContent = await articleRepository.findOneBy({ id: value.id })
        if (waitGetArticleContent) {
            waitGetArticleContent.title = value.name
            waitGetArticleContent.content = value.pass
            waitGetArticleContent.category = value.category
            await articleRepository.save(waitGetArticleContent)
            return waitGetArticleContent
        }else{
            throw new Error('文章未找到');
        }
    }
}