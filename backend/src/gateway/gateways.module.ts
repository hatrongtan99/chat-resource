import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { SocketClientManager } from './socketClientManager';

@Module({
    providers: [MessageGateway, SocketClientManager],
    exports: [SocketClientManager],
})
export class GatewayModule {}
