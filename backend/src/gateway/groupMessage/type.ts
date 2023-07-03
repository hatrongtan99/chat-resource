import { Group } from 'src/db/entities';

export interface PayloadClientJoinGroupMessage {
    group: Group;
}

export interface PayloadClientLeaveGroupMessage {
    group: Group;
}

export interface PayloadClientStatusTyping {
    group: Group;
}
