import { Module } from '@nestjs/common';
import { MessageGateway } from './message/message.gateway';
import { SocketClientManager } from './socketClientManager';
import { FriendsGateway } from './friends/friends.gateway';
import { Gateway } from './gatewayConnect-Dicconect-manage';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
    imports: [FriendsModule],
    providers: [SocketClientManager, Gateway, MessageGateway, FriendsGateway],
    exports: [SocketClientManager],
})
export class GatewayModule {}
