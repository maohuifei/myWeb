import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id!: number;//使用非空断言操作符!告诉 TypeScript id 一定会被赋值

    @Column()
    title!: string;//标题

    @Column()
    abstract: string="暂无摘要";//摘要

    @Column('text')//支持长文本
    content: string="";//内容

    @Column()
    categoryId!: number;//类别id

    @Column()
    recommend: boolean=false;//是否推荐

    @Column()
    state: boolean=true;//状态：上架or下架

    @CreateDateColumn()
    created_at!: Date; // 自动填充记录创建时间

    @UpdateDateColumn()
    updated_at!: Date; // 自动填充记录更新时间
}
