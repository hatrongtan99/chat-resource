import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm';
import { Users } from './Users';

@Entity({ name: 'profile' })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'simple-json', nullable: true })
    about?: { lable: string; content: string }[];

    @Column({ nullable: true })
    avatar?: string;

    @Column({ nullable: true })
    banner?: string;

    @OneToOne(() => Users, (user) => user.profile)
    user: Users;
}
