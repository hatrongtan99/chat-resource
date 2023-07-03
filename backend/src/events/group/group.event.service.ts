import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Group } from 'src/db/entities';
import { SocketClientManager } from 'src/gateway/socketClientManager';
import { EventGroup, GatewayGroup } from 'src/utils/constant';
import {
    PayloadEventGroupAddNewFriend,
    PayloadEventGroupKickFriend,
    PayloadEventOutFromGroup,
    PayloadEventTranferOwner,
} from './type';

@Injectable()
export class GroupEventService {
    constructor(private readonly socketClientManage: SocketClientManager) {}

    // create new Group
    @OnEvent(EventGroup.CREATE_NEW_GROUP)
    onNewGroupCreated(payload: { group: Group }) {
        const users = payload.group.users;
        users.forEach((user) => {
            const socketUser = this.socketClientManage.getSocketClient(user.id);
            socketUser && socketUser.emit(GatewayGroup.GROUP_NEW, payload);
        });
    }

    @OnEvent(EventGroup.ADD_FRIEND_TO_GROUP)
    onAddFriendToGroup(payload: PayloadEventGroupAddNewFriend) {
        const { usersIdList, group, inviter } = payload;
        // add new friends
        usersIdList.forEach(({ id }) => {
            const socketUserBeInvited =
                this.socketClientManage.getSocketClient(id);
            socketUserBeInvited?.emit(
                GatewayGroup.GROUP_FRIEND_BE_ADDED,
                payload,
            );
        });
        group.users.forEach((user) => {
            const newUserInGroup = usersIdList.find(({ id }) => id === user.id);
            if (newUserInGroup) return;
            this.socketClientManage
                .getSocketClient(user.id)
                ?.emit(GatewayGroup.GROUP_ADD_FRIEND, { group });
        });
    }

    @OnEvent(EventGroup.KICK_OUT_FRIEND_FROM_GROUP)
    onKickOutFriendFromGroup(payload: PayloadEventGroupKickFriend) {
        const { ortherId: userKicked, group } = payload;
        const socketUserKicked =
            this.socketClientManage.getSocketClient(userKicked);

        if (socketUserKicked) {
            socketUserKicked.emit(GatewayGroup.GROUP_FRIEND_KICKED, { group });
            socketUserKicked.leave(`group-${group.id}`);
        }

        group.users.forEach((user) => {
            const socketClient = this.socketClientManage.getSocketClient(
                user.id,
            );
            socketClient &&
                socketClient.emit(GatewayGroup.GROUP_KICK_FRIEND, {
                    group,
                });
        });
    }

    @OnEvent(EventGroup.OUT_FROM_GROUP)
    onOutFromGroup(payload: PayloadEventOutFromGroup) {
        const { group } = payload;
        group.users.forEach((user) => {
            const socketClient = this.socketClientManage.getSocketClient(
                user.id,
            );
            socketClient?.emit(
                GatewayGroup.GROUP_ONE_FRIEND_OUT_GROUP,
                payload,
            );
        });
    }

    @OnEvent(EventGroup.TRANFER_OWNER)
    onTranferOwner(payload: PayloadEventTranferOwner) {
        const { group } = payload;
        group.users.forEach((user) => {
            this.socketClientManage
                .getSocketClient(user.id)
                ?.emit(GatewayGroup.GROUP_TRANFER_OWNER, payload);
        });
    }
}
