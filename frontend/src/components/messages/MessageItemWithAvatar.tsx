"use client";

import cx from "classnames";
import { useAccesstoken } from "@/hook/useAuth";
import { Message } from "@/types/Message";
import Image from "next/image";
import { ReactElement, useMemo } from "react";

interface MessageItemWithAvatarProps {
    children: ReactElement;
    message: Message;
    avatar: boolean;
}
const MessageItemWithAvatar = ({
    children,
    message,
    avatar,
}: MessageItemWithAvatarProps) => {
    const { id } = useAccesstoken();

    const isOwnMessage = useMemo(() => {
        return message.author.id === id;
    }, [id, message]);

    return (
        <div className="w-full">
            <div
                className={cx(
                    "relative w-[30px] h-[30px] rounded-full overflow-hidden mr-2 float-left"
                )}
            >
                {avatar && !isOwnMessage && (
                    <Image
                        src={
                            message.author.profile?.avatar ??
                            "/defaultAvatar.png"
                        }
                        fill
                        alt="avatar"
                    />
                )}
            </div>

            {children}
        </div>
    );
};

export default MessageItemWithAvatar;
