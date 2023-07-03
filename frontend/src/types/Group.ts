import { GroupMessage } from "./Message";
import { User } from "./User";

export interface Group {
    id: number;
    title: string;
    creator: User;
    owner: User;
    users: User[];
    messages: GroupMessage[];
    lastMessageSent: GroupMessage;
    avatar: string;
    create_at: Date;
    update_at: Date;
}

export interface CreateNewGroupParams {
    title: string;
    users: { id: number }[];
    avatar: File;
}

export interface AddFriendToGroupParams {
    usersIdList: { id: number }[];
    groupId: number;
}

export interface GetGroupMessagesParams {
    token: string;
    groupId: number;
    limit?: number;
    offset?: number;
}

export interface KickOutFriendFromGroupParams {
    ortherId: number;
    groupId: number;
}

export interface TranferOwnerGroupParams {
    ortherId: number;
    groupId: number;
}
// socket
export interface NewGroupMessagePayload {
    group: Group;
    message: GroupMessage;
}
