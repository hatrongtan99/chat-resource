import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { MessageAttachment } from './MessageAttachment';
import { Conversation } from './Convesation';
import { Users } from './Users';

@Entity({ name: 'message' })
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToOne(() => Conversation, (conversation) => conversation.messages)
    conversation: Conversation;

    @ManyToOne(() => Users, (user) => user.messages)
    author: Users;

    @OneToMany(
        () => MessageAttachment,
        (messageAttachment) => messageAttachment.message,
    )
    @JoinColumn()
    attachments: MessageAttachment[];

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
