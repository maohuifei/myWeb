import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id:number=0;

    @Column()
    name:string='';

    @Column()
    type:string='';
}
