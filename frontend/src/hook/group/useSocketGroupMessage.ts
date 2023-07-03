"use client";

import { SocketContext } from "@/context/socket/SocketProvider";
import { GroupMessageSocket } from "@/utils/constant";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

const useSocketGroupMessage = ({ groupId }: { groupId: number }) => {
    const socket = useContext(SocketContext);

    const [isTyping, setIsTyping] = useState(false);
    const [ortherIsTyping, setOrtherIsTyping] = useState(false);
    const refTimer = useRef<NodeJS.Timeout>();

    useEffect(() => {
        socket?.emit(GroupMessageSocket.GROUP_MESSAGE_JOIN_GROUP, {
            group: { id: groupId },
        });

        socket?.on(GroupMessageSocket.GROUP_ON_TYPING_START, () => {
            console.log("orther is start typing.");
            setOrtherIsTyping(true);
        });
        socket?.on(GroupMessageSocket.GROUP_ON_TYPING_STOP, () => {
            console.log("orther is stop typing.");

            setOrtherIsTyping(false);
        });

        return () => {
            socket?.emit(GroupMessageSocket.GROUP_MESSAGE_LEAVE_GROUP, {
                group: { id: groupId },
            });
            socket?.off(GroupMessageSocket.GROUP_MESSAGE_JOIN_GROUP);
            socket?.off(GroupMessageSocket.GROUP_ON_TYPING_START);
            socket?.off(GroupMessageSocket.GROUP_ON_TYPING_STOP);
        };
    }, [socket, groupId]);

    const sendStatusTyping = useCallback(() => {
        if (isTyping) {
            clearTimeout(refTimer.current);
            refTimer.current = setTimeout(() => {
                socket?.emit(GroupMessageSocket.GROUP_ON_TYPING_STOP, {
                    group: { id: groupId },
                });
                setIsTyping(false);
            }, 2000);
        } else {
            setIsTyping(true);
            socket?.emit(GroupMessageSocket.GROUP_ON_TYPING_START, {
                group: { id: groupId },
            });
        }
    }, [groupId, socket, isTyping]);

    return { sendStatusTyping, ortherIsTyping };
};

export default useSocketGroupMessage;
