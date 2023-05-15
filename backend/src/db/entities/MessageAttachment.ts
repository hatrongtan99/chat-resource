import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './Message';

@Entity({ name: 'message_attachment' })
export class MessageAttachment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    assess_id: string;

    @Column()
    url: string;

    @ManyToOne(() => Message, (message) => message.attachments)
    message: Message;
}
