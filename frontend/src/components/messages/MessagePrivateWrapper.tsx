"use client";
import React, { useContext, useMemo } from "react";
import TopMessages from "./TopMessages";
import MessagesContainer from "./MessagesContainer";
import InputMessage from "./InputMessage";
import useFetchOrUpdateMessagePrivate from "@/hook/messagePrivate/useFetchOrUpdateMessagePrivate";
import useSocketMessagePrivate from "@/hook/messagePrivate/useSocketMessagePrivate";
import { MessagePrivateContext } from "@/context/message/MessagePrivateProvider";
import { ConversationsContext } from "@/context/conversations/ConversationProvider";
import { Conversation } from "@/types/Conversations";

const MessagePrivateWrapper = ({
    conversationId,
}: {
    conversationId: number;
}) => {
    useFetchOrUpdateMessagePrivate({ conversationId });

    const { isRecipientTyping, sendStatusTyping } = useSocketMessagePrivate({
        conversationId,
    });

    const {
        content,
        setContent,
        sendMessage,
        messages,
        status,
        hasMore,
        setOffsetMessages,
    } = useContext(MessagePrivateContext);
    const { conversations } = useContext(ConversationsContext);

    const conversation: Conversation | undefined = useMemo(() => {
        return conversations.find((c) => c.id === conversationId);
    }, [conversationId, conversations]);

    return (
        <div className="flex flex-col grow h-[100vh]">
            <TopMessages conversation={conversation} />
            <MessagesContainer
                messages={messages.get(conversationId) ?? []}
                status={status}
                conversationId={conversationId}
                isReceiverTyping={isRecipientTyping}
                hasMore={hasMore}
                setOffsetMessages={setOffsetMessages}
            />
            <InputMessage
                sendStatusTyping={sendStatusTyping}
                content={content}
                setContent={setContent}
                sendMessage={sendMessage(conversationId)}
            />
        </div>
    );
};

export default MessagePrivateWrapper;
