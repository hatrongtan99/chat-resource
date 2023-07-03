import { Users } from 'src/db/entities';

export interface CreateNewGroupParams {
    creator: Users;
    users: { id: number }[];
    title: string;
    avatar: Express.Multer.File;
}

export interface GetGroupsParams {
    userId: number;
}

export interface IsInGroupParams {
    userId: number;
    groupId: number;
}

export interface AddFriendToGroupParams {
    userId: number;
    usersIdList: { id: number }[];
    groupId: number;
}
export interface OutGroupParams {
    userId: number;
    groupId: number;
}

export interface KickOutGroupParams {
    userId: number;
    ortherId: number;
    groupId: number;
}

export interface tranferOwnerParams {
    userId: number;
    ortherId: number;
    groupId: number;
}
