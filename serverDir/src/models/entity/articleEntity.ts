import { Entity, PrimaryGeneratedColumn, Column ,CreateDateColumn,UpdateDateColumn} from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id!: number;//使用非空断言操作符!告诉 TypeScript id 一定会被赋值

    @Column()
    title!: string;

    @Column('text')//支持长文本
    content!: string;

    @Column()
    category!: string;

    // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    // creationTime!: Date;  
  
    // @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    // modificationTime!: Date;  
}
