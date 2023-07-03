"use client";

import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useAccesstoken } from "../useAuth";
import { MessagePrivateContext } from "@/context/message/MessagePrivateProvider";
import { getMessagesAPI } from "@/api/message";

const useFetchOrUpdateMessagePrivate = ({
    conversationId,
}: {
    conversationId: number;
}) => {
    const { accessToken, id } = useAccesstoken();
    const { setStatus, setMessages, setHasMore, offsetMessgages, hasMore } =
        useContext(MessagePrivateContext);
    const { data, status } = useQuery(
        [
            `message/conversation/${conversationId}`,
            { offset: offsetMessgages.get(conversationId) ?? 0 },
        ],
        () =>
            getMessagesAPI({
                token: accessToken!,
                conversationId,
                offset: offsetMessgages.get(conversationId) ?? 0,
            }),
        {
            enabled: !!accessToken && (hasMore.get(conversationId) ?? true),
        }
    );

    useEffect(() => {
        if (data?.data?.messages?.length === 0) {
            setHasMore((prev) => {
                prev.set(conversationId, false);
                return prev;
            });
        }
    }, [data, conversationId]);

    useEffect(() => {
        if (status === "success") {
            setMessages((prev) => {
                const messagesOfConversation = prev.get(conversationId) ?? [];
                prev.set(conversationId, [
                    ...data.data.messages,
                    ...messagesOfConversation,
                ]);
                return structuredClone(prev);
            });
        }
        setStatus(status);
    }, [status, conversationId, data]);

    return null;
};

export default useFetchOrUpdateMessagePrivate;
