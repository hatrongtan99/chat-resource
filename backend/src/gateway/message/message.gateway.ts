import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthenticateSocket } from '../types';
import { SocketClientManager } from '../socketClientManager';
import { GatewayMessagePrivate } from 'src/utils/constant';
import { ClientJoinConversationPayload, MessageTypingPayload } from './type';

@WebSocketGateway()
export class MessageGateway {
    constructor(private readonly socketClientManager: SocketClientManager) {}

    @WebSocketServer()
    server: Server;

    // join conversation
    @SubscribeMessage(GatewayMessagePrivate.MESSAGE_JOIN_CONVERSATION)
    onClientJoinConversation(
        @ConnectedSocket() authSocket: AuthenticateSocket,
        @MessageBody() payload: ClientJoinConversationPayload,
    ) {
        const conversationId = payload.conversation.id;
        console.log(
            `${authSocket.user.fullname} join conversation ${conversationId}`,
        );
        authSocket.join(`conversation-${conversationId}`);
    }

    // leave conversation
    @SubscribeMessage(GatewayMessagePrivate.MESSAGE_LEAVE_CONVERSATION)
    onClientLeaveConversation(
        @ConnectedSocket() authSocket: AuthenticateSocket,
        @MessageBody() payload: ClientJoinConversationPayload,
    ) {
        const conversationId = payload.conversation.id;
        console.log(
            `${authSocket.user.fullname} leave conversation ${conversationId}`,
        );
        authSocket.leave(`conversation-${conversationId}`);
    }

    //start typing
    @SubscribeMessage(GatewayMessagePrivate.MESSAGE_IS_TYPING_START)
    onMessageStartTyping(
        @ConnectedSocket() authSocket: AuthenticateSocket,
        @MessageBody() payload: MessageTypingPayload,
    ) {
        const conversationId = payload.conversation.id;
        authSocket
            .to(`conversation-${conversationId}`)
            .emit(GatewayMessagePrivate.MESSAGE_ON_TYPING_START);
    }

    // stop typing
    @SubscribeMessage(GatewayMessagePrivate.MESSAGE_IS_TYPING_STOP)
    onMessageStopTyping(
        @ConnectedSocket() authSocket: AuthenticateSocket,
        @MessageBody() payload: MessageTypingPayload,
    ) {
        const conversationId = payload.conversation.id;
        authSocket
            .to(`conversation-${conversationId}`)
            .emit(GatewayMessagePrivate.MESSAGE_ON_TYPING_STOP);
    }
}
