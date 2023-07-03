import { Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { MessageAttachment } from './MessageAttachment';
import { Conversation } from './Conversation';
import { BaseMessage } from './BaseMessage';

@Entity({ name: 'message' })
export class Message extends BaseMessage {
    @ManyToOne(() => Conversation, (conversation) => conversation.messages)
    conversation: Conversation;

    @OneToMany(
        () => MessageAttachment,
        (messageAttachment) => messageAttachment.message,
    )
    @JoinColumn()
    attachments: MessageAttachment[];
}
