import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { SocketClientManager } from '../socketClientManager';
import { GatewayGroupMessage } from 'src/utils/constant';
import { AuthenticateSocket } from '../types';
import {
    PayloadClientJoinGroupMessage,
    PayloadClientLeaveGroupMessage,
    PayloadClientStatusTyping,
} from './type';
import { Server } from 'socket.io';

@WebSocketGateway()
export class GroupMessageGateway {
    constructor(private readonly socketClientManager: SocketClientManager) {}

    @WebSocketServer()
    private io: Server;

    @SubscribeMessage(GatewayGroupMessage.GROUP_MESSAGE_JOIN_GROUP)
    onClientJoinGroupMessage(
        @ConnectedSocket() authSocket: AuthenticateSocket,
        @MessageBody() payload: PayloadClientJoinGroupMessage,
    ) {
        const socketClient = this.socketClientManager.getSocketClient(
            authSocket.user.id,
        );
        console.log(
            `user ${authSocket.user.fullname} join group ${payload.group.id}`,
        );
        socketClient && socketClient.join(`group-${payload.group.id}`);
    }

    @SubscribeMessage(GatewayGroupMessage.GROUP_MESSAGE_LEAVE_GROUP)
    onClientLeaveGroupMessage(
        @ConnectedSocket() authSocket: AuthenticateSocket,
        @MessageBody() payload: PayloadClientLeaveGroupMessage,
    ) {
        const socketClient = this.socketClientManager.getSocketClient(
            authSocket.user.id,
        );
        socketClient && socketClient.leave(`group-${payload.group.id}`);
        console.log(
            `user ${authSocket.user.fullname} leave group ${payload.group.id}`,
        );
    }

    @SubscribeMessage(GatewayGroupMessage.GROUP_IS_TYPING_START)
    onClientStartTyping(
        @ConnectedSocket() authSocket: AuthenticateSocket,
        @MessageBody() payload: PayloadClientStatusTyping,
    ) {
        const groupId = payload.group.id;

        authSocket
            .to(`group-${groupId}`)
            .emit(GatewayGroupMessage.GROUP_ON_ORTHER_TYPING_START, payload);
    }

    @SubscribeMessage(GatewayGroupMessage.GROUP_IS_TYPING_STOP)
    onClientStopTyping(
        @ConnectedSocket() authSocket: AuthenticateSocket,
        @MessageBody() payload: PayloadClientStatusTyping,
    ) {
        const groupId = payload.group.id;
        authSocket
            .to(`group-${groupId}`)
            .emit(GatewayGroupMessage.GROUP_ON_ORTHER_TYPING_STOP, payload);
    }
}
