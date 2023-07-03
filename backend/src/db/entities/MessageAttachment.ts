import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './Message';

export enum TypeFile {
    'IMAGE' = 'IMAGE',
    VIDEO = 'VIDEO',
    ORTHER = 'ORTHER',
}

@Entity({ name: 'message_attachment' })
export class MessageAttachment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    public_id: string;

    @Column()
    url: string;

    @Column({ type: 'enum', enum: TypeFile, default: TypeFile.IMAGE })
    type: string;

    @Column()
    file_name: string;

    @ManyToOne(() => Message, (message) => message.attachments, {
        onDelete: 'CASCADE',
    })
    message: Message;
}
