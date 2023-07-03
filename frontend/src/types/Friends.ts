import { Socket } from "socket.io-client";
import { User } from "./User";

export interface CreateRequestFriendParams {
    receicId: number;
}

export interface CancelRequestFriendParams {
    ortherId: number;
}

export interface AcceptRequestFriendParams {
    ortherId: number;
}

export interface UnfriendParams {
    ortherId: number;
}

export enum StatusFriend {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
}

export interface Friends {
    id: number;
    sender: User;
    receiver: User;
    status: StatusFriend;
    create_at: Date;
}

export type ListFriendOnline = Socket & { user: User };
