import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseMessage } from './BaseMessage';
import { Group } from './Group';
import { GroupMessageAttachments } from './GroupMessageAttachments';

@Entity()
export class GroupMessage extends BaseMessage {
    @ManyToOne(() => Group, (group) => group.messages)
    group: Group;

    @OneToMany(
        () => GroupMessageAttachments,
        (groupAttachment) => groupAttachment.message,
    )
    @JoinColumn()
    attachments: GroupMessageAttachments[];
}
