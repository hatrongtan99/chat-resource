"use client";
import { getGroupMessagesApi } from "@/api/groupMessage";
import { GroupMessageContext } from "@/context/groupMessage/GroupMessageProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useAccesstoken } from "../useAuth";

const useFetchOrUpdateGroupMessage = ({ groupId }: { groupId: number }) => {
    const {
        setStatus,
        setGroupMessages,
        offsetMessgages,
        setHasMore,
        hasMore,
    } = useContext(GroupMessageContext);
    const { accessToken, id } = useAccesstoken();

    const { data, status } = useQuery(
        [
            `messages/group/${groupId}`,
            { offset: offsetMessgages.get(groupId) ?? 0 },
        ],
        () =>
            getGroupMessagesApi({
                token: accessToken!,
                groupId,
                offset: offsetMessgages.get(groupId) ?? 0,
            }),
        { enabled: !!accessToken && (hasMore.get(groupId) ?? true) }
    );

    useEffect(() => {
        if (data?.data?.messages?.length === 0) {
            setHasMore((prev) => {
                prev.set(groupId, false);
                return prev;
            });
        }
    }, [data, groupId]);

    useEffect(() => {
        if (status === "success") {
            setGroupMessages((prev) => {
                const messagesOfGroup = prev.get(groupId) ?? [];
                prev.set(groupId, [...data.data.messages, ...messagesOfGroup]);
                return structuredClone(prev);
            });
        }
        setStatus(status);
    }, [status, groupId, data]);
    return null;
};

export default useFetchOrUpdateGroupMessage;
