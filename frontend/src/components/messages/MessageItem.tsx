"use client";

import { useAccesstoken } from "@/hook/useAuth";
import { Message } from "@/types/Message";
import { formatDate } from "@/utils";
import ctx from "classnames";
import { ForwardedRef, forwardRef, useMemo } from "react";
import AttachmentsMessage from "./AttachmentsMessage";

interface MessageItemProps {
    message: Message;
    showBottomTime?: boolean;
}

const MessageItem = forwardRef(
    (
        { message, showBottomTime }: MessageItemProps,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const { id } = useAccesstoken();

        const isOwnMessage = useMemo(() => {
            return message.author.id === id;
        }, [message, id]);

        return (
            <div ref={ref} className="h-fit w-full">
                {message.content && (
                    <div className={"mt-1 "}>
                        <div
                            className={ctx(
                                { "bg-bgDarkmodeComment": !isOwnMessage },
                                { "bg-bgMyMessage": isOwnMessage },
                                "rounded-xl px-3 py-1 inline-block lg:max-w-[500px] md:max-w-[400px] sm:max-w-[300px]",
                                isOwnMessage ? "float-right" : "float-left"
                            )}
                        >
                            <p className="font-medium text-sm">
                                {message.content}
                            </p>
                        </div>
                        {showBottomTime && (
                            <div
                                className={ctx(
                                    "w-full text-center mb-4 clear-both"
                                )}
                            >
                                <p className="text-sm text-gray-600 font-medium">
                                    {formatDate(message.create_at)}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <AttachmentsMessage attachments={message.attachments} />
            </div>
        );
    }
);

export default MessageItem;
