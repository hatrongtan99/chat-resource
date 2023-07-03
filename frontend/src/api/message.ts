import { GetMessagesParams, Message } from "@/types/Message";
import fetchIntance from "./fetchIntance";

export const createNewMessagePrivateAPI = (token: string, body: FormData) => {
    return fetchIntance("/messages", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
        },
        body,
        sendForm: true,
    });
};

export const getMessagesAPI = ({
    token,
    conversationId,
    limit = 10,
    offset = 0,
}: GetMessagesParams) => {
    return fetchIntance<{ messages: Message[] }>(
        `/messages/${conversationId}?limit=${limit}&offset=${offset}`,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );
};
