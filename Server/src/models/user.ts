import { AppDataSource } from '../../data-source'
import { User } from './entity/userEntity'

export class UserDataService{
    async addUser(value:any){
        const userRepository = AppDataSource.getRepository(User)
        const newUser = userRepository.create(value)
        await userRepository.save(newUser)
    }

    async delUser(value:any){
        const userRepository = AppDataSource.getRepository(User)
        const waitDelUser = await userRepository.findOneBy({ id: value.id })
        if(waitDelUser){
            await userRepository.remove(waitDelUser)
        }else{
            throw new Error('用户未找到');
        }
    }
    async putUser(value:any){
        const userRepository = AppDataSource.getRepository(User)
        const waitPutUser = await userRepository.findOneBy({ id: value.id })
        if (waitPutUser) {
            waitPutUser.username = value.username
            waitPutUser.password = value.password
            waitPutUser.category = value.category
            await userRepository.save(waitPutUser)
        }else{
            throw new Error('用户未找到');
        }
    }
    async getUser(value:any){
        const userRepository = AppDataSource.getRepository(User)
        const { page, pageSize } = value;  
        const skip = (page - 1) * pageSize;  
        const userlist = await userRepository.createQueryBuilder('user')  
      .skip(skip) // 跳过指定数量的记录  
      .take(pageSize) // 获取指定数量的记录  
      .getMany(); // 执行查询并获取结果  
  
    // 如果需要，还可以计算总记录数（用于分页控件等）  
        const totalCount = await userRepository.count();
        return {userlist,totalCount}
    }
    async potLogin(value:any){
        const userRepository = AppDataSource.getRepository(User)
        const waitPutUser = await userRepository.findOneBy({ username: value.username })
        if (waitPutUser) {
            if(waitPutUser.password==value.password){
                return waitPutUser
            }else{
                throw new Error('密码错误');
            }
        }else{
            throw new Error('用户未找到');
        }
    }

}