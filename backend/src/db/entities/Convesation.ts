import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Message } from './Message';

@Entity({ name: 'conversation' })
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Users)
    @JoinColumn()
    creator: Users;

    @OneToOne(() => Users)
    @JoinColumn()
    recipter: Users;

    @OneToMany(() => Message, (message) => message)
    messages: Message[];

    @CreateDateColumn()
    create_at: Date;
}
