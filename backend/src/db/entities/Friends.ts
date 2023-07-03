import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';

export enum StatusFriend {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

@Entity({ name: 'friends' })
export class Friends {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Users, { createForeignKeyConstraints: false })
    @JoinColumn()
    sender: Users;

    @OneToOne(() => Users, { createForeignKeyConstraints: false })
    @JoinColumn()
    receiver: Users;

    @Column({ type: 'enum', enum: StatusFriend, default: StatusFriend.PENDING })
    status: StatusFriend;

    @CreateDateColumn()
    cretate_at: Date;
}
