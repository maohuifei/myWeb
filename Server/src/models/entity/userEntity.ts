import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
// import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    username: string = '';

    @Column()
    password: string = '';

    @Column()
    category: string = '';

    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 8);
    // }
}
