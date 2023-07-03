import { Group, GroupMessage } from 'src/db/entities';

export interface PayloadEventNewGroupMessage {
    group: Group;
    message: GroupMessage;
}
