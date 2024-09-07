import { AppDataSource } from '../../data-source'
import { User } from '../models/entity/User'

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
            waitPutUser.name = value.name
            waitPutUser.pass = value.pass
            await userRepository.save(waitPutUser)
        }else{
            throw new Error('用户未找到');
        }
    }
    async getUser(){
        const userRepository = AppDataSource.getRepository(User)
        const userlist = await userRepository.find();
        return userlist
    }
}