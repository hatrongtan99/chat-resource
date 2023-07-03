import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
    ParseIntPipe,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/auth/decorators/public';
import { Users } from 'src/db/entities';
import { EventMessagePrivate, Routes } from 'src/utils/constant';
import { InfoFile } from './types';
import {
    CreateNewMessageDto,
    DeleteMessageDTO,
    QueryStringGetMessagesDTO,
} from './dto';
import { MessagePrivateService } from './message-private.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
    PayloadEventMessagePrivateCreateNewMessage,
    PayloadEventMessagePrivateDeleteMessage,
} from 'src/events/messagePrivate/types';
import { ValidationInfoFile } from './pipe/validationInfoFilePipe';

@Controller(Routes.MESSAGES)
export class MessagePrivateController {
    constructor(
        private readonly messagePrivateService: MessagePrivateService,
        private eventEmitter: EventEmitter2,
    ) {}

    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: 'attachments',
                maxCount: 5,
            },
        ]),
    )
    @Post()
    async handleCreateNewMessage(
        @AuthUser() user: Users,
        @UploadedFiles()
        { attachments }: { attachments: Express.Multer.File[] },
        @Body('conversationId', ParseIntPipe) conversationId: number,
        @Body('infoFiles', new ValidationInfoFile()) infoFiles: InfoFile[],
        @Body() body: CreateNewMessageDto,
    ) {
        const response = await this.messagePrivateService.createPrivateMessage({
            authorId: user.id,
            conversationId: conversationId,
            attachments: attachments?.map((file, index) => ({
                file,
                file_name: infoFiles[index].file_name,
                type: infoFiles[index].type,
            })),
            content: body.content,
        });
        this.eventEmitter.emit(EventMessagePrivate.CREATE_NEW_MESSAGE, {
            message: response.message,
            conversation: response.conversation,
        } as PayloadEventMessagePrivateCreateNewMessage);
        return {
            success: true,
        };
    }

    @Get(':conversationId')
    async handleGetMessages(
        @AuthUser() user: Users,
        @Param('conversationId', ParseIntPipe) conversationId: number,
        @Query()
        query?: QueryStringGetMessagesDTO,
    ) {
        return {
            messages: (
                await this.messagePrivateService.getMessages({
                    conversationId,
                    limit: query.limit,
                    offset: query.offset,
                })
            ).reverse(),
        };
    }

    @Delete()
    async handleDeleteMessage(
        @AuthUser() authUser: Users,
        @Body() { messageId, conversationId }: DeleteMessageDTO,
    ) {
        await this.messagePrivateService.deleteMessage({
            user: authUser,
            conversationId: conversationId,
            messageId: messageId,
        });

        this.eventEmitter.emit(EventMessagePrivate.DELETE_MESSAGE, {
            conversationId,
            messageId,
        } as PayloadEventMessagePrivateDeleteMessage);

        return {
            success: true,
        };
    }
}
