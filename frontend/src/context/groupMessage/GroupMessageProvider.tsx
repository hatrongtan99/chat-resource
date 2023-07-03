"use client";
import { GroupMessage, TypeFile } from "@/types/Message";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";
import { AttachmentsContext } from "../attachments/AttachmentsProvider";
import useToast from "@/hook/useToast";
import { createNewGroupMessageApi } from "@/api/groupMessage";
import { useAccesstoken } from "@/hook/useAuth";
import { NewGroupMessagePayload } from "@/types/Group";

interface GroupMessageContextProps {
    sendMessage: (groupId: number) => () => Promise<void>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    status: "error" | "loading" | "success";
    setStatus: Dispatch<SetStateAction<"error" | "loading" | "success">>;
    groupMessages: Map<number, GroupMessage[]>;
    setGroupMessages: Dispatch<SetStateAction<Map<number, GroupMessage[]>>>;
    offsetMessgages: Map<number, number>;
    setOffsetMessages: Dispatch<SetStateAction<Map<number, number>>>;
    hasMore: Map<number, boolean>;
    setHasMore: Dispatch<SetStateAction<Map<number, boolean>>>;
    addNewMessageGroup: ({ group, message }: NewGroupMessagePayload) => void;
}

export const GroupMessageContext = createContext(
    {} as GroupMessageContextProps
);

const GroupMessageProvider = ({ children }: { children: ReactNode }) => {
    const { attachments, clearAttachments } = useContext(AttachmentsContext);
    const { accessToken } = useAccesstoken();

    const { error: errorToast } = useToast();
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading"
    );

    // group message
    const [groupMessages, setGroupMessages] = useState<
        Map<number, GroupMessage[]>
    >(new Map());

    // OFFSET
    const [offsetMessgages, setOffsetMessages] = useState<Map<number, number>>(
        new Map()
    );

    // has more
    const [hasMore, setHasMore] = useState<Map<number, boolean>>(new Map());

    const [content, setContent] = useState<string>("");

    const sendMessage = (groupId: number) => {
        return async () => {
            if (!content.trim() && attachments.length === 0) return;
            try {
                const formData = new FormData();
                formData.append("groupId", groupId.toString());
                content.trim() && formData.append("content", content);
                const infoFiles: { file_name: string; type: TypeFile }[] = [];
                for (let i = 0; i < attachments.length; i++) {
                    formData.append("attachments", attachments[i].file);
                    infoFiles.push({
                        file_name: attachments[i].file_name,
                        type: attachments[i].type,
                    });
                }
                formData.append("infoFiles", JSON.stringify(infoFiles));
                await createNewGroupMessageApi(accessToken!, formData);
                setContent("");
                clearAttachments();
            } catch (error) {
                console.log(error);
                setStatus("error");
                errorToast("Lỗi khi gửi tin nhắn!!!");
            }
        };
    };

    const addNewMessageGroup = ({ group, message }: NewGroupMessagePayload) => {
        setGroupMessages((prev) => {
            const messagesOfGroupMessage = prev.get(group.id);
            prev.set(group.id, [...(messagesOfGroupMessage ?? []), message]);
            return structuredClone(prev);
        });
    };

    return (
        <GroupMessageContext.Provider
            value={{
                sendMessage,
                content,
                setContent,
                status,
                setStatus,
                groupMessages,
                setGroupMessages,
                offsetMessgages,
                setOffsetMessages,
                hasMore,
                setHasMore,
                addNewMessageGroup,
            }}
        >
            {children}
        </GroupMessageContext.Provider>
    );
};

export default GroupMessageProvider;
