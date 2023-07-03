"use client";
import { getConversationsAPI } from "@/api/conversations";
import { useAccesstoken } from "@/hook/useAuth";
import { Conversation } from "@/types/Conversations";
import { useQuery } from "@tanstack/react-query";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";

interface IConversationsContext {
    conversationId: number | null;
    setConversationId: Dispatch<SetStateAction<number | null>>;
    conversations: Conversation[];
    setConversations: Dispatch<SetStateAction<Conversation[]>>;
    status: "loading" | "error" | "success";
}
export const ConversationsContext = createContext({} as IConversationsContext);

const ConversationProvider = ({ children }: { children: ReactNode }) => {
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    const { accessToken, id } = useAccesstoken();
    const { data, status } = useQuery(
        ["conversations", id],
        () => getConversationsAPI(accessToken!),
        {
            enabled: !!accessToken,
        }
    );

    useEffect(() => {
        if (status === "success") {
            setConversations(data.data.conversations);
        }
    }, [status]);

    return (
        <ConversationsContext.Provider
            value={{
                conversationId,
                setConversationId,
                conversations,
                setConversations,
                status,
            }}
        >
            {children}
        </ConversationsContext.Provider>
    );
};

export default ConversationProvider;
