"use client";
import { Message } from "@/types/Message";
import MessageItem from "./MessageItem";
import {
    Dispatch,
    SetStateAction,
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import { getTimeDate } from "@/utils";
import useIntersectionObserverMessages from "@/hook/useIntersectionObserverMessages";
import MoveBottomMessages from "../button/MoveBottomMessages";
import SpinnerLoadmore from "../spinner/SpinnerLoadmore";
import SpinnerIsTyping from "../spinner/SpinnerIsTyping";

const TIME_LIMIT = 3600000;

const MessagesContainer = ({
    messages,
    status,
    conversationId,
    isReceiverTyping,
    hasMore,
    setOffsetMessages,
}: {
    messages: Message[];
    status: "loading" | "error" | "success";
    conversationId: number;
    isReceiverTyping: boolean;
    hasMore: Map<number, boolean>;
    setOffsetMessages: Dispatch<SetStateAction<Map<number, number>>>;
}) => {
    const refWrapper = useRef<HTMLDivElement>(null);
    const [isScrollTop, setIsScrollTop] = useState(false);

    useEffect(() => {
        if (isScrollTop) return;

        if (refWrapper.current) {
            refWrapper.current.scrollTop = refWrapper.current.scrollHeight;
        }
    }, [messages, isScrollTop]);

    useEffect(() => {
        if (isScrollTop) return;
        refWrapper.current?.scrollTo({ top: refWrapper.current?.scrollHeight });
    }, [isReceiverTyping, isScrollTop]);

    // intersection abserver
    const { messageRef } = useIntersectionObserverMessages(
        refWrapper.current,
        conversationId,
        {
            status,
            hasMore,
            setOffsetMessages,
        }
    );

    const mapMessages = (
        message: Message,
        index: number,
        messages: Message[]
    ) => {
        const nextMessageItem = messages[index + 1];

        const isExpiredTimeLimit =
            getTimeDate(nextMessageItem?.create_at) -
                getTimeDate(message.create_at) >
                TIME_LIMIT || message.author.id !== nextMessageItem?.author?.id;

        if (index == 0) {
            if (isExpiredTimeLimit) {
                return (
                    <MessageItem
                        message={message}
                        key={index}
                        ref={messageRef}
                        showBottomTime
                    />
                );
            }
            return (
                <MessageItem message={message} key={index} ref={messageRef} />
            );
        }

        if (index + 1 === messages.length || isExpiredTimeLimit)
            return <MessageItem message={message} key={index} showBottomTime />;
        return <MessageItem message={message} key={index} />;
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

                <div className="flex flex-col px-4 mt-auto w-full h-fit ">
                    {messages.map(mapMessages)}
                    {isReceiverTyping && <SpinnerIsTyping />}
                </div>
            </div>

            {isScrollTop && <MoveBottomMessages refParrent={refWrapper} />}
        </div>
    );
};

export default memo(MessagesContainer);
