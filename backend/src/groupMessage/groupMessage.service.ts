import {
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group, GroupMessage } from 'src/db/entities';
import { GroupService } from 'src/group/group.service';
import { MessageAttachmentSevice } from 'src/messageAttachment/messageAttachment.service';
import { Repository } from 'typeorm';
import { CreateNewGroupMessage, GetGroupMessagesParams } from './type';

@Injectable()
export class GroupMessageService {
    constructor(
        @InjectRepository(GroupMessage)
        private readonly groupMessageRepository: Repository<GroupMessage>,
        private readonly messageAttachmentService: MessageAttachmentSevice,
        private readonly groupService: GroupService,
    ) {}

    async createGroupMessage({
        authorId,
        attachments,
        content,
        groupId,
    }: CreateNewGroupMessage): Promise<{
        group: Group;
        message: GroupMessage;
    }> {
        let group = await this.groupService.getGroupById(groupId);
        if (!group) {
            throw new NotFoundException('Group not found!!!');
        }
        const author = group.users.find((user) => user.id === authorId);
        if (!author) {
            throw new NotAcceptableException('User not in Group!!!');
        }
        const newMessage = this.groupMessageRepository.create({
            author,
            content,
            attachments: attachments
                ? await this.messageAttachmentService.uploadAttachmentsGroupMessage(
                      attachments,
                  )
                : [],
            group,
        });

        group.lastMessageSent = newMessage;

        group = await this.groupService.saveGroup(group);

        return {
            group,
            message: newMessage,
        };
    }

    getGroupMessages({
        groupId,
        limit = 10,
        offset = 0,
    }: GetGroupMessagesParams): Promise<GroupMessage[]> {
        return this.groupMessageRepository
            .createQueryBuilder('groupMessage')
            .where('groupMessage.group = :groupId', { groupId })
            .leftJoin('groupMessage.author', 'author')
            .leftJoin('author.profile', 'profile')
            .leftJoinAndSelect('groupMessage.attachments', 'attachments')
            .select([
                'groupMessage',
                'author.id',
                'author.fullname',
                'author.email',
                'profile.avatar',
                'attachments',
            ])
            .addOrderBy('groupMessage.create_at', 'DESC')
            .offset(offset)
            .limit(limit)
            .getMany();
    }
}
