import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GroupMessage } from './GroupMessage';
export enum TypeFile {
    'IMAGE' = 'IMAGE',
    VIDEO = 'VIDEO',
    ORTHER = 'ORTHER',
}

@Entity({ name: 'group_attachment' })
export class GroupMessageAttachments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public_id: string;

    @Column()
    url: string;

    @Column({ type: 'enum', enum: TypeFile, default: TypeFile.IMAGE })
    type: string;

    @Column()
    file_name: string;

    @ManyToOne(() => GroupMessage, (groupMessage) => groupMessage.attachments, {
        onDelete: 'CASCADE',
    })
    message: GroupMessage;
}
