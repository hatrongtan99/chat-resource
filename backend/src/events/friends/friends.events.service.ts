import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventFriends, GatewayFriends } from 'src/utils/constant';
import {
    PayloadEventFriendAcceptRequest,
    PayloadEventFriendCreateRequest,
} from './types';
import { SocketClientManager } from 'src/gateway/socketClientManager';

@Injectable()
export class FriendsEventsService {
    constructor(private readonly socketClientManager: SocketClientManager) {}

    @OnEvent(EventFriends.CREATE_FRIEND_REQUEST)
    onFriendNewRequest(payload: PayloadEventFriendCreateRequest) {
        console.log(
            'create new Friend request:::',
            payload.sender.id,
            payload.receiver.id,
        );
        const receierSocket = this.socketClientManager.getSocketClient(
            payload.receiver.id,
        );
        receierSocket &&
            receierSocket.emit(GatewayFriends.FRIEND_NEW_REQUEST, payload);
    }

    @OnEvent(EventFriends.ACCEPT_FRIEND_REQUEST)
    onFriendAcceptRequest(payload: PayloadEventFriendAcceptRequest) {
        const senderSocket = this.socketClientManager.getSocketClient(
            payload.sender.id,
        );
        senderSocket &&
            senderSocket.emit(GatewayFriends.FRIEND_ACCEPTED_REQUEST, payload);
    }
}
