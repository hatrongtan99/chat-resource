import { Module } from '@nestjs/common';
import { FriendsEventsService } from './friends/friends.events.service';
import { MessagePrivateEventsService } from './messagePrivate/messagesPrivate.events.service';
import { GatewayModule } from 'src/gateway/gateways.module';
import { GroupEventService } from './group/group.event.service';
import { GroupMessageEventService } from './groupMessage/groupMessage.event.service';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
    imports: [GatewayModule, ConversationsModule],
    providers: [
        FriendsEventsService,
        MessagePrivateEventsService,
        GroupEventService,
        GroupMessageEventService,
    ],
})
export class EventModule {}
