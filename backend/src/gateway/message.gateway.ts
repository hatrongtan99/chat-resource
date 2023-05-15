import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { AuthenticateSocket } from './types';

class GuardWs implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const socketClient: Socket = context.switchToWs().getClient();
        const token = socketClient.handshake.headers.authorization;
        console.log(token);
        if (!token) {
            console.log('run');
            throw new WsException('unauthorization');
        }
        return true;
    }
}

@WebSocketGateway()
export class MessageGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    // constructor() {

    // }

    @WebSocketServer()
    server: Server;

    handleConnection(client: AuthenticateSocket, ...args: any[]) {
        console.log(client.user.id);
    }
    handleDisconnect(client: any) {
        console.log('client disconnect');
    }

    @UseGuards(GuardWs)
    @SubscribeMessage('message.client')
    onMessageClient(socket: Socket) {
        socket.emit('fromServer', 'oke');
    }
}
