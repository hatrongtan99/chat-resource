"use client";
import { createNewMessagePrivateAPI } from "@/api/message";
import { useAccesstoken } from "@/hook/useAuth";
import { Message, TypeFile } from "@/types/Message";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { SocketContext } from "../socket/SocketProvider";
import { MessageSocket } from "@/utils/constant";
import { AttachmentsContext } from "../attachments/AttachmentsProvider";
import useToast from "@/hook/useToast";
import {
    Conversation,
    DeleteMessagePayload,
    NewMessagePayload,
} from "@/types/Conversations";

interface MessagePrivateContextProps {
    status: "loading" | "error" | "success";
    setStatus: Dispatch<SetStateAction<"loading" | "error" | "success">>;
    sendMessage: (conversationId: number) => () => Promise<void>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    messages: Map<number, Message[]>;
    setMessages: Dispatch<SetStateAction<Map<number, Message[]>>>;
    setHasMore: Dispatch<SetStateAction<Map<number, boolean>>>;
    hasMore: Map<number, boolean>;
    offsetMessgages: Map<number, number>;
    setOffsetMessages: Dispatch<SetStateAction<Map<number, number>>>;
    addNewMessageConversation: ({}: NewMessagePayload) => void;
    deleteMessageConversation: ({
        messageId,
        conversationId,
    }: DeleteMessagePayload) => void;
}

export const MessagePrivateContext = createContext(
    {} as MessagePrivateContextProps
);

const MessagePrivateProvider = ({ children }: { children: ReactNode }) => {
    const { accessToken, id } = useAccesstoken();
    const { error: errorToast } = useToast();
    const socket = useContext(SocketContext);

    const { attachments, clearAttachments } = useContext(AttachmentsContext);

    //  MESSAGE
    const [messages, setMessages] = useState<Map<number, Message[]>>(new Map());
    // OFFSET
    const [offsetMessgages, setOffsetMessages] = useState<Map<number, number>>(
        new Map()
    );

    const [status, setStatus] = useState<"loading" | "error" | "success">(
        "loading"
    );
    const [content, setContent] = useState<string>("");

    const [hasMore, setHasMore] = useState<Map<number, boolean>>(new Map());

    useEffect(() => {
        return () => {
            setContent("");
        };
    }, []);

    const sendMessage = (conversationId: number) => {
        return async () => {
            socket?.emit(MessageSocket.MESSAGE_IS_TYPING_STOP, {
                conversation: { id: conversationId },
            });
            if (!content.trim() && attachments?.length == 0) return;

            try {
                setStatus("loading");
                const formdata = new FormData();
                formdata.append("conversationId", `${conversationId}`);
                content.trim() && formdata.append("content", content);
                const infoFiles: { file_name: string; type: TypeFile }[] = [];
                for (let i = 0; i < attachments.length; i++) {
                    formdata.append("attachments", attachments[i].file);
                    infoFiles.push({
                        file_name: attachments[i].file_name,
                        type: attachments[i].type,
                    });
                }
                formdata.append("infoFiles", JSON.stringify(infoFiles));
                setContent("");
                clearAttachments();
                await createNewMessagePrivateAPI(accessToken!, formdata);
            } catch (error) {
                console.log(error);
                setStatus("error");
                errorToast("Lỗi khi gửi tin nhắn!");
            }
            setStatus("success");
        };
    };

    const addNewMessageConversation = ({
        message,
        conversation,
    }: NewMessagePayload) => {
        setMessages((prev) => {
            const messagesOfConversation = prev.get(conversation.id) ?? [];
            prev.set(conversation.id, [...messagesOfConversation, message]);
            return structuredClone(prev);
        });
    };

    const deleteMessageConversation = ({
        messageId,
        conversationId,
    }: DeleteMessagePayload) => {
        setMessages((prev) => {
            const messagesOfConversation = prev.get(conversationId) ?? [];
            const newMessagesOfConversation = messagesOfConversation.filter(
                (message) => message.id !== messageId
            );
            prev.set(conversationId, newMessagesOfConversation);
            return structuredClone(prev);
        });
    };

    return (
        <MessagePrivateContext.Provider
            value={{
                status,
                setStatus,
                sendMessage,
                content,
                setContent,
                messages,
                setMessages,
                offsetMessgages,
                setOffsetMessages,
                hasMore,
                setHasMore,
                addNewMessageConversation,
                deleteMessageConversation,
            }}
        >
            {children}
        </MessagePrivateContext.Provider>
    );
};

export default MessagePrivateProvider;
