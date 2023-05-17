import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { SocketClientManager } from './socketClientManager';
import { AuthenticateSocket } from './types';

@Injectable()
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly socketManager: SocketClientManager) {}

    handleConnection(client: AuthenticateSocket, ...args: any[]) {
        console.log(`userId ${client.user.id} connecting`);
        this.socketManager.setSocketClient(client.user.id, client);
    }

    handleDisconnect(client: AuthenticateSocket) {
        console.log(`userId ${client.user.id} disconnect`);
        this.socketManager.removeSocketClient(client.user.id);
    }
}
