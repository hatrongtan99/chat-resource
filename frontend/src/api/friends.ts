import {
    AcceptRequestFriendParams,
    CancelRequestFriendParams,
    CreateRequestFriendParams,
    Friends,
} from "@/types/Friends";
import fetchIntance from "./fetchIntance";
import { User } from "@/types/User";
import { UnfriendParams } from "@/types/Friends";

export const getListFriendsAPI = (token: string) => {
    return fetchIntance<{ success: boolean; friends: User[] }>("/friends", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getListFriendRequestAPI = (token: string) => {
    return fetchIntance<{ success: true; friends: Friends[] }>(
        "/friends/pending",
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );
};

export const createFriendRequestAPI = (
    token: string,
    body: CreateRequestFriendParams
) => {
    return fetchIntance<{ success: boolean }>("/friends/create-request", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(body),
    });
};

export const acceptFriendRequestAPI = (
    token: string,
    body: AcceptRequestFriendParams
) => {
    return fetchIntance("/friends/accept-request", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(body),
    });
};

export const cancelFriendRequestAPI = (
    token: string,
    body: CancelRequestFriendParams
) => {
    return fetchIntance<{ success: boolean }>("/friends/cancel-request", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(body),
    });
};

export const unfriendAPI = (token: string, body: UnfriendParams) => {
    return fetchIntance("/friends/unfriend", {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(body),
    });
};

export const searchFriendsAPI = (token: string, q: string) => {
    return fetchIntance<User[]>(`/friends/search?_q=${q}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getFriendProfile = (token: string, id: number) => {
    return fetchIntance<{ friend: User; status: Friends | null }>(
        `/friends/${id}`,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );
};
