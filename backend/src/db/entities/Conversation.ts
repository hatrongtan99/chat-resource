import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
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

    @OneToMany(() => Message, (message) => message.conversation, {
        cascade: ['insert', 'recover', 'update'],
    })
    @JoinColumn()
    messages: Message[];

    @OneToOne(() => Message, { cascade: true })
    @JoinColumn({ name: 'last_message_sent' })
    lastMessageSent: Message;

    @UpdateDateColumn({ name: 'last_message_sent_at' })
    lastMessageSentAt: Date;

    @CreateDateColumn()
    create_at: Date;
}
