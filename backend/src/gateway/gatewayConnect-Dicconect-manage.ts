import { Body, Injectable } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { SocketClientManager } from './socketClientManager';
import { AuthenticateSocket } from './types';

const URL_CLIENT = process.env.URL_CLIENT;

@WebSocketGateway({})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly socketManager: SocketClientManager) {}

    handleConnection(client: AuthenticateSocket, ...args: any[]) {
        console.log(`userId ${client.user.id} connecting`);
        this.socketManager.setSocketClient(client.user.id, client);
        client.emit('connectsuccess', 'hello from server');
    }

    handleDisconnect(client: AuthenticateSocket) {
        console.log(`userId ${client.user.id} disconnect`);
        this.socketManager.removeSocketClient(client.user.id);
    }

    @SubscribeMessage('ping')
    hanldePing(client: AuthenticateSocket) {
        console.log(`ping event ${client.user.id}`);
        client.emit(
            'fromServer',
            `hello user ${client.user.email} from server`,
        );
    }
}
