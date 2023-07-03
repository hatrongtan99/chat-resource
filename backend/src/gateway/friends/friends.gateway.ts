import {
    ConnectedSocket,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthenticateSocket } from '../types';
import { GatewayFriends } from 'src/utils/constant';
import { SocketClientManager } from '../socketClientManager';
import { FriendsService } from 'src/friends/friends.service';

@WebSocketGateway()
export class FriendsGateway {
    constructor(
        private readonly socketClientManager: SocketClientManager,
        private readonly friendsService: FriendsService,
    ) {}
    @WebSocketServer()
    private io: Server;

    @SubscribeMessage(GatewayFriends.FRIEND_GET_FRIENDS_ONLINE)
    async onGetFriendsOnline(
        @ConnectedSocket() authSocket: AuthenticateSocket,
    ) {
        const { user } = authSocket;

        console.log(`${user.fullname} fetching friends online`);

        const friends = await this.friendsService.getFriends(user.id);

        const friendsOnline = friends.filter((friend) => {
            return Boolean(this.socketClientManager.hasSocketClient(friend.id));
        });
        authSocket.emit(
            GatewayFriends.FRIEND_GET_FRIENDS_ONLINE,
            friendsOnline,
        );
    }
}
