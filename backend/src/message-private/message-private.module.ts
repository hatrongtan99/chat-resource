import { Module, forwardRef } from '@nestjs/common';
import { MessagePrivateService } from './message-private.service';
import { MessagePrivateController } from './message-private.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message, Users } from 'src/db/entities';
import { MessageAttachmentModule } from 'src/messageAttachment/messgaeAttachment.module';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message, Conversation]),
        MessageAttachmentModule,
        ConversationsModule,
    ],
    providers: [MessagePrivateService],
    controllers: [MessagePrivateController],
    exports: [MessagePrivateService],
})
export class MessagePrivateModule {}
