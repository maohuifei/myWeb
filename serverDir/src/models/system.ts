import { AppDataSource } from "../../data-source";
import { System } from "./entity/systemEntity";

export class SystemDataService {
    async addSystem(value: any) {
        const systemRepository = AppDataSource.getRepository(System)
        const newUser = systemRepository.create(value)
        await systemRepository.save(newUser)
    }

    async delSystem(value: any) {
        const systemRepository = AppDataSource.getRepository(System)
        const waitDelUser = await systemRepository.findOneBy({ id: value.id })
        if (waitDelUser) {
            await systemRepository.remove(waitDelUser)
        } else {
            throw new Error('配置未找到');
        }
    }
    async getSystem(value: any){  
        const systemRepository = AppDataSource.getRepository(System) 
        const systems = await systemRepository.find({
          where: { type: value.type }
      });
        if (systems.length > 0) {  
          return systems;  
        } else {  
          throw new Error('没有找到符合条件的系统');  
        }  
      }   
      async gettypeSystem(){  
        const systemRepository = AppDataSource.getRepository(System) 
        const systems = await systemRepository
            .createQueryBuilder('system')
            .select(['system.type', 'system.typeName'])
            .getMany();
            const uniqueSystems = systems.reduce((acc: { type: string; typeName: string }[], item) => {
              const existing = acc.find(x => x.type === item.type && x.typeName === item.typeName);
              if (!existing) {
                  acc.push(item);
              }
              return acc;
          }, []);
        if (systems.length > 0) {  
          return uniqueSystems;  
        } else {  
          throw new Error('没有找到符合条件的系统');  
        }  
      }   
}
