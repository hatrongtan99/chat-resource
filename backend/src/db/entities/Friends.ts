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
    CANCEL = 'CANCEL',
}

@Entity({ name: 'friends' })
export class Friends {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Users)
    @JoinColumn()
    sender: Users;

    @OneToOne(() => Users)
    @JoinColumn()
    reciecer: Users;

    @Column({ type: 'enum', enum: StatusFriend, default: StatusFriend.PENDING })
    status: string;

    @CreateDateColumn()
    cretate_at: Date;
}
