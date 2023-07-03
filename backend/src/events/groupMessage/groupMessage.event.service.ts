import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventGroupMessage, GatewayGroupMessage } from 'src/utils/constant';
import { PayloadEventNewGroupMessage } from './type';
import { SocketClientManager } from 'src/gateway/socketClientManager';

@Injectable()
export class GroupMessageEventService {
    constructor(private readonly socketClientManager: SocketClientManager) {}
    @OnEvent(EventGroupMessage.CREATE_NEW_GROUP_MESSAGE)
    onNewGroupMessage(payload: PayloadEventNewGroupMessage) {
        const { group, message } = payload;
        const users = group.users;
        users.forEach((user) => {
            const socketClient = this.socketClientManager.getSocketClient(
                user.id,
            );
            socketClient &&
                socketClient.emit(
                    GatewayGroupMessage.GROUP_MESSAGE_ON_NEW,
                    payload,
                );
        });
    }
}
