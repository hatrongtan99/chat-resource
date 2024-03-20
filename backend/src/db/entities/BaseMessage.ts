import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Users } from './Users';

@Entity({ name: 'message' })
export abstract class BaseMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToOne(() => Users, (user) => user.messages)
    author: Users;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
