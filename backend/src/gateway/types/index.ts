import { Socket } from 'socket.io';
import { Users } from 'src/db/entities';

export type AuthenticateSocket = Socket & {
    user: Users;
};
