import { GetGroupMessagesParams } from "@/types/Group";
import fetchIntance from "./fetchIntance";
import { GroupMessage } from "@/types/Message";

export const createNewGroupMessageApi = (token: string, body: FormData) => {
    return fetchIntance<{ success: true }>("/groups/message", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
        body,
        sendForm: true,
    });
};

export const getGroupMessagesApi = ({
    token,
    groupId,
    offset = 0,
    limit = 10,
}: GetGroupMessagesParams) => {
    return fetchIntance<{ messages: GroupMessage[] }>(
        `/groups/message/${groupId}?offset=${offset}&limit=${limit}`,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );
};
