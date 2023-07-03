"use client";
import {
    Dispatch,
    SetStateAction,
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import SpinnerLoadmore from "../spinner/SpinnerLoadmore";
import { GroupMessage } from "@/types/Message";
import { getTimeDate } from "@/utils";
import useIntersectionObserverMessages from "@/hook/useIntersectionObserverMessages";
import GroupMessageItem from "./GroupMessageItem";
import MoveBottomMessages from "../button/MoveBottomMessages";
import SpinnerIsTyping from "../spinner/SpinnerIsTyping";
import MessageItemWithAvatar from "../messages/MessageItemWithAvatar";

const TIME_LIMIT = 3600000;
interface GroupMessageContainerProps {
    groupId: number;
    status: "loading" | "success" | "error";
    messages: GroupMessage[];
    hasMore: Map<number, boolean>;
    setOffsetMessages: Dispatch<SetStateAction<Map<number, number>>>;
    ortherIsTyping: boolean;
}
const GroupMessageContainer = ({
    groupId,
    status,
    messages,
    hasMore,
    setOffsetMessages,
    ortherIsTyping,
}: GroupMessageContainerProps) => {
    const [isScrollTop, setIsScrollTop] = useState(false);
    const refWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isScrollTop) return;
        refWrapper.current?.scrollTo({ top: refWrapper.current?.scrollHeight });
    }, [messages, isScrollTop]);

    const { messageRef } = useIntersectionObserverMessages(
        refWrapper.current,
        groupId,
        { status, hasMore, setOffsetMessages }
    );

    const mapMessages = (
        message: GroupMessage,
        index: number,
        messages: GroupMessage[]
    ) => {
        const nextMessageItem = messages[index + 1];
        const isExpiredTimeLimit =
            getTimeDate(nextMessageItem?.create_at) -
                getTimeDate(message.create_at) >
                TIME_LIMIT || message.author.id !== nextMessageItem?.author?.id;

        return (
            <MessageItemWithAvatar
                message={message}
                avatar={isExpiredTimeLimit || index + 1 == messages.length}
            >
                {index == 0 ? (
                    isExpiredTimeLimit ? (
                        <GroupMessageItem
                            ref={messageRef}
                            key={index}
                            message={message}
                            showBottomTime
                        />
                    ) : (
                        <GroupMessageItem
                            ref={messageRef}
                            key={index}
                            message={message}
                        />
                    )
                ) : index + 1 === messages.length || isExpiredTimeLimit ? (
                    <GroupMessageItem
                        message={message}
                        key={index}
                        showBottomTime
                    />
                ) : (
                    <GroupMessageItem message={message} key={index} />
                )}
            </MessageItemWithAvatar>
        );
    };

    return (
        <div className="grow overflow-hidden relative">
            <div
                className="h-full w-full overflow-y-scroll flex"
                onScroll={(e) => {
                    const node = e.target as HTMLDivElement;
                    setIsScrollTop(
                        node.scrollHeight >
                            node.scrollTop + node.clientHeight + 100
                    );
                }}
                ref={refWrapper}
            >
                {status === "loading" && <SpinnerLoadmore />}
                <div className="flex flex-col px-4 mt-auto w-full h-fit">
                    {messages.map(mapMessages)}
                    {ortherIsTyping && <SpinnerIsTyping />}
                </div>
            </div>

            {isScrollTop && <MoveBottomMessages refParrent={refWrapper} />}
        </div>
    );
};

export default memo(GroupMessageContainer);
