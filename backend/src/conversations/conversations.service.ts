import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message, Users } from 'src/db/entities';
import { FriendsService } from 'src/friends/friends.service';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,
        @InjectRepository(Message)
        private readonly MessageRepository: Repository<Message>,
        private readonly userService: UserService,
        private readonly friendSevice: FriendsService,
    ) {}

    getConversations(userId: number): Promise<Conversation[]> {
        return this.conversationRepository.find({
            where: [{ creator: { id: userId } }, { recipter: { id: userId } }],
            relations: {
                creator: { profile: true },
                recipter: { profile: true },
                lastMessageSent: {
                    attachments: true,
                    author: true,
                },
            },
            order: { lastMessageSentAt: 'DESC' },
        });
    }

    getConversationById(id: number): Promise<Conversation> {
        return this.conversationRepository.findOne({
            where: { id },
            relations: {
                lastMessageSent: {
                    attachments: true,
                },
                creator: true,
                recipter: true,
            },
        });
    }

    async getMessagesFromConversation(
        id: number,
        limit: number = 10,
        skip: number = 0,
    ) {
        return this.conversationRepository
            .createQueryBuilder('conversation')
            .where('conversation.id = :id', { id })
            .leftJoinAndSelect('conversation.messages', 'message')
            .leftJoinAndSelect(
                'conversation.lastMessageSent',
                'lastMessageSent',
            )
            .leftJoinAndSelect('conversation.creator', 'creator')
            .leftJoinAndSelect('conversation.recipter', 'recipter')
            .orderBy('message.create_at', 'DESC')
            .skip(skip)
            .limit(limit)
            .getOne();
    }

    async findOrcreateConversation(
        userId: number,
        ortherUserId: number,
    ): Promise<Conversation> {
        if (userId === ortherUserId) {
            throw new BadRequestException(
                "You can't create Conversation your self!!!",
            );
        }
        const existConversation = await this.existConversation(
            userId,
            ortherUserId,
        );
        if (existConversation) {
            return existConversation;
        }
        const creator = (await this.userService.findUser({
            id: userId,
        })) as Users;
        const recipter = (await this.userService.findUser({
            id: ortherUserId,
        })) as Users;
        if (!creator || !recipter) {
            throw new BadRequestException('User not found!');
        }
        const newConversation = this.conversationRepository.create({
            creator,
            recipter,
        });
        return this.conversationRepository.save(newConversation);
    }

    existConversation(userId: number, ortherUserId: number) {
        return this.conversationRepository.findOne({
            where: [
                { creator: { id: userId }, recipter: { id: ortherUserId } },
                {
                    creator: { id: ortherUserId },
                    recipter: { id: userId },
                },
            ],
            relations: {
                creator: true,
                recipter: true,
                lastMessageSent: true,
            },
        });
    }
}
