"use client";

import { useAccesstoken } from "@/hook/useAuth";
import { GroupMessage } from "@/types/Message";
import { ForwardedRef, forwardRef, useMemo } from "react";
import ctx from "classnames";
import { formatDate } from "@/utils";
import AttachmentsMessage from "../messages/AttachmentsMessage";

interface GroupMessageItemProps {
    message: GroupMessage;
    showBottomTime?: boolean;
}

const GroupMessageItem = forwardRef(
    (
        { message, showBottomTime }: GroupMessageItemProps,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const { id } = useAccesstoken();

        const isOwnMessage = useMemo(() => {
            return message.author.id === id;
        }, [id, message]);

        return (
            <div className="h-fit" ref={ref}>
                {message.content && (
                    <div className="mt-1">
                        <div
                            className={ctx(
                                {
                                    "bg-bgDarkmodeComment": !isOwnMessage,
                                },
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

export default GroupMessageItem;
