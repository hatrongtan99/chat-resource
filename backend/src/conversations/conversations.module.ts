import { Module, forwardRef } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationService } from './conversations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message, Users } from 'src/db/entities';
import { FriendsModule } from 'src/friends/friends.module';
import { UsersModule } from 'src/users/users.module';
import { MessagePrivateModule } from 'src/message-private/message-private.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Conversation, Message]),
        FriendsModule,
        UsersModule,
    ],
    controllers: [ConversationsController],
    providers: [ConversationService],
    exports: [ConversationService],
})
export class ConversationsModule {}
