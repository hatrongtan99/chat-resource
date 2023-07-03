import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthUser, Public } from 'src/auth/decorators/public';
import { Users } from 'src/db/entities';
import { Routes } from 'src/utils/constant';
import { ConversationService } from './conversations.service';

@Controller(Routes.CONVERSATIONS)
export class ConversationsController {
    constructor(private readonly conversationService: ConversationService) {}

    @Get()
    async handleGetConversations(@AuthUser() user: Users) {
        return {
            success: true,
            conversations: await this.conversationService.getConversations(
                user.id,
            ),
        };
    }

    @Post(':ortherId')
    async handleFindOrCreateConversation(
        @AuthUser() authUser: Users,
        @Param('ortherId', new ParseIntPipe()) ortherId: number,
    ) {
        return {
            success: true,
            conversation:
                await this.conversationService.findOrcreateConversation(
                    authUser.id,
                    ortherId,
                ),
        };
    }
}
