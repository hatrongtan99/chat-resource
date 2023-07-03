import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/auth/decorators/public';
import { Users } from 'src/db/entities';
import { ValidationInfoFile } from 'src/message-private/pipe/validationInfoFilePipe';
import { InfoFile } from 'src/message-private/types';
import { EventGroupMessage, Routes } from 'src/utils/constant';
import { CreateNewMessageGroupDTO } from './dto';
import { QueryStringGetMessagesDTO } from 'src/message-private/dto';
import { GroupMessageService } from './groupMessage.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PayloadEventNewGroupMessage } from 'src/events/groupMessage/type';

@Controller(Routes.GROUP_MESSAGE)
export class GroupMessageController {
    constructor(
        private readonly groupMessageService: GroupMessageService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: 'attachments',
                maxCount: 5,
            },
        ]),
    )
    async handleCreateNewGroupMessage(
        @AuthUser() authUser: Users,
        @UploadedFiles()
        { attachments }: { attachments: Express.Multer.File[] },
        @Body('groupId', ParseIntPipe) groupId: number,
        @Body('infoFiles', new ValidationInfoFile()) infoFiles: InfoFile[],
        @Body() body: CreateNewMessageGroupDTO,
    ) {
        const response = await this.groupMessageService.createGroupMessage({
            authorId: authUser.id,
            attachments: attachments?.map((file, index) => ({
                file,
                file_name: infoFiles[index].file_name,
                type: infoFiles[index].type,
            })),
            content: body.content,
            groupId,
        });
        this.eventEmitter.emit(
            EventGroupMessage.CREATE_NEW_GROUP_MESSAGE,
            response as PayloadEventNewGroupMessage,
        );
        return { success: true, response };
    }

    @Get(':groupId')
    async handleGetGroupMessages(
        @AuthUser() authUser: Users,
        @Param('groupId', ParseIntPipe) groupId: number,
        @Query() query?: QueryStringGetMessagesDTO,
    ) {
        return {
            messages: (
                await this.groupMessageService.getGroupMessages({
                    groupId,
                    offset: query.offset,
                    limit: query.limit,
                })
            ).reverse(),
        };
    }
}
