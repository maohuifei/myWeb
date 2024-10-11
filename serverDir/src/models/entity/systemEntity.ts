import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity()
export class System {
    @PrimaryGeneratedColumn()
    id:number=0;

    @Column()
    type:string='';
    @Column()
    typeName:string='';

    @Column()
    name:string='';

    @Column()
    value:string='';
}
