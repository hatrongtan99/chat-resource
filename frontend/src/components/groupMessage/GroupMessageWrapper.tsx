"use client";

import { useContext, useMemo } from "react";
import InputMessage from "../messages/InputMessage";
import { GroupMessageContext } from "@/context/groupMessage/GroupMessageProvider";
import useFetchOrUpdateGroupMessage from "@/hook/group/useFetchOrUpdateGroupMessage";
import TopGroupMessage from "./TopGroupMessage";
import { GroupContext } from "@/context/group/GroupProvider";
import GroupMessageContainer from "./GroupMessageContainer";
import useSocketGroupMessage from "@/hook/group/useSocketGroupMessage";
import Spinner from "../Spinner";

const GroupMessageWrapper = ({ groupId }: { groupId: number }) => {
    const { ortherIsTyping, sendStatusTyping } = useSocketGroupMessage({
        groupId,
    });
    // fetch data group
    useFetchOrUpdateGroupMessage({ groupId });

    const {
        content,
        setContent,
        sendMessage,
        status,
        groupMessages,
        hasMore,
        setOffsetMessages,
    } = useContext(GroupMessageContext);

    const { groups } = useContext(GroupContext);

    const group = useMemo(() => {
        return groups.find((g) => g.id == groupId);
    }, [groupId, groups]);

    return (
        <div className="grow flex flex-col h-[100vh]">
            {status === "loading" || !group ? (
                <Spinner />
            ) : (
                <>
                    <TopGroupMessage group={group!} />
                    <GroupMessageContainer
                        groupId={groupId}
                        status={status}
                        messages={groupMessages.get(groupId) ?? []}
                        hasMore={hasMore}
                        setOffsetMessages={setOffsetMessages}
                        ortherIsTyping={ortherIsTyping}
                    />
                    <InputMessage
                        sendStatusTyping={sendStatusTyping}
                        content={content}
                        setContent={setContent}
                        sendMessage={sendMessage(groupId)}
                    />
                </>
            )}
        </div>
    );
};

export default GroupMessageWrapper;
