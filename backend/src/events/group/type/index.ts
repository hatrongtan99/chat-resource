import { Group, Users } from 'src/db/entities';

export type PayloadEventGroupAddNewFriend = {
    usersIdList: { id: number }[];
    group: Group;
    inviter: Users;
};

export type PayloadEventGroupKickFriend = {
    ortherId: number;
    group: Group;
};

export type PayloadEventTranferOwner = {
    group: Group;
};

export type PayloadEventOutFromGroup = {
    group: Group;
};
