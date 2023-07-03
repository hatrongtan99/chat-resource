import {
    AddFriendToGroupParams,
    Group,
    KickOutFriendFromGroupParams,
    TranferOwnerGroupParams,
} from "@/types/Group";
import fetchIntance from "./fetchIntance";

export const getGroupsApi = (token: string) => {
    return fetchIntance<{ success: boolean; groups: Group[] }>("/groups", {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

export const createNewGroupApi = (token: string, body: FormData) => {
    return fetchIntance("/groups", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
        body,
        sendForm: true,
    });
};

export const addFriendsToGroupApi = (
    token: string,
    body: AddFriendToGroupParams
) => {
    return fetchIntance("/groups/add-friend", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};

export const kickFriendFromGroup = (
    token: string,
    body: KickOutFriendFromGroupParams
) => {
    return fetchIntance("/groups/kick", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};

export const tranferOwnerApi = (
    token: string,
    body: TranferOwnerGroupParams
) => {
    return fetchIntance<{ success: boolean }>(`/groups/${body.groupId}/owner`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};

export const outGroupApi = (token: string, groupId: number) => {
    return fetchIntance<{ success: boolean }>(`/groups/${groupId}/out-group`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};
