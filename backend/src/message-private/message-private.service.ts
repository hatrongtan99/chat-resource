import {
    BadRequestException,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message, Users } from 'src/db/entities';
import { MessageAttachmentSevice } from 'src/messageAttachment/messageAttachment.service';
import { Repository } from 'typeorm';
import {
    CreateNewMessagePrivateMessageParams,
    DeleteLastMessageParams,
    DeleteMessageParams,
    GetListMessagesParams,
} from './types';
import { ConversationService } from 'src/conversations/conversations.service';

@Injectable()
export class MessagePrivateService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,
        private readonly messageAttachmentService: MessageAttachmentSevice,
        private readonly conversationService: ConversationService,
    ) {}

    async createPrivateMessage({
        conversationId,
        content,
        attachments,
        authorId,
    }: CreateNewMessagePrivateMessageParams): Promise<{
        message: Message;
        conversation: Conversation;
    }> {
        const conversation = await this.conversationService.getConversationById(
            conversationId,
        );
        if (!conversation) {
        }

        const { creator, recipter } = conversation;
        const author = authorId === creator.id ? creator : recipter;
        const newMessage = this.messageRepository.create({
            content,
            author,
            conversation,
        });
        if (attachments) {
            newMessage.attachments =
                await this.messageAttachmentService.uploadAttachmentMessagePrivate(
                    attachments,
                );
        }
        conversation.lastMessageSent = newMessage;
        const updatedConversation = await this.conversationRepository.save(
            conversation,
        );
        return {
            message: newMessage,
            conversation: updatedConversation,
        };
    }

    async getMessages(params: GetListMessagesParams): Promise<Message[]> {
        const { conversationId, limit = 10, offset = 0 } = params;
        return this.messageRepository
            .createQueryBuilder('message')
            .where('message.conversation = :conversationId', {
                conversationId,
            })
            .leftJoin('message.author', 'author')
            .leftJoin('author.profile', 'profile')
            .leftJoinAndSelect('message.attachments', 'attachments')
            .select([
                'message',
                'author.id',
                'author.fullname',
                'author.email',
                'profile.avatar',
                'attachments',
            ])
            .addOrderBy('message.create_at', 'DESC')
            .offset(offset)
            .limit(limit)
            .getMany();
    }

    async deleteMessage({
        messageId,
        conversationId,
        user,
    }: DeleteMessageParams) {
        const conversationWithMessage =
            await this.conversationService.getMessagesFromConversation(
                conversationId,
                5,
            );
        if (!conversationWithMessage) {
            throw new NotFoundException('Message Not Found!!!');
        }

        const message = await this.messageRepository.findOne({
            where: {
                id: messageId,
            },
        });

        if (!message) {
            throw new NotFoundException('Message Not Found!!!');
        }
        if (message.author.id !== user.id) {
            throw new NotAcceptableException('You insufficient permission!');
        }

        if (conversationWithMessage.lastMessageSent.id !== message.id) {
            return this.messageRepository.delete(message.id);
        }
        return this.deleteLastMessage({
            conversation: conversationWithMessage,
            messageId: message.id,
        });
    }

    async deleteLastMessage({
        conversation,
        messageId,
    }: DeleteLastMessageParams) {
        const sizeMessage = conversation.messages.length;
        if (sizeMessage <= 1) {
            conversation.lastMessageSent = null;
            await this.conversationRepository.save(conversation);
        } else {
            const lastNewMessage = conversation.messages[1];
            conversation.lastMessageSent = lastNewMessage;
        }
        return this.messageRepository.delete(messageId);
    }
}
