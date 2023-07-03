import { Conversation } from "@/types/Conversations";
import fetchIntance from "./fetchIntance";

export const getConversationsAPI = (token: string) => {
    return fetchIntance<{ success: true; conversations: Conversation[] }>(
        "/conversations",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const findOrcreateConversationAPI = (
    token: string,
    ortherId: number
) => {
    return fetchIntance<{ success: boolean; conversation: Conversation }>(
        `/conversations/${ortherId}`,
        {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    );
};
