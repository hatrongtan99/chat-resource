"use client";

import { SocketContext } from "@/context/socket/SocketProvider";
import { MessageSocket } from "@/utils/constant";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

const useSocketMessagePrivate = ({
    conversationId,
}: {
    conversationId: number;
}) => {
    const socket = useContext(SocketContext);
    const [isRecipientTyping, setIsRecipientTyping] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState(false);
    const refTimer = useRef<NodeJS.Timeout>();

    useEffect(() => {
        socket?.on(MessageSocket.MESSAGE_ON_TYPING_START, () => {
            setIsRecipientTyping(true);
        });

        socket?.on(MessageSocket.MESSAGE_ON_TYPING_STOP, () => {
            setIsRecipientTyping(false);
        });

        socket?.emit(MessageSocket.MESSAGE_JOIN_CONVERSATION, {
            conversation: { id: conversationId },
        });

        return () => {
            socket?.emit(MessageSocket.MESSAGE_LEAVE_CONVERSATION, {
                conversation: { id: conversationId },
            });
            socket?.off(MessageSocket.MESSAGE_JOIN_CONVERSATION);
            socket?.off(MessageSocket.MESSAGE_ON_TYPING_START);
            socket?.off(MessageSocket.MESSAGE_ON_TYPING_STOP);
        };
    }, [socket, conversationId]);

    const sendStatusTyping = useCallback(() => {
        if (isTyping) {
            clearTimeout(refTimer.current!);
            refTimer.current = setTimeout(() => {
                socket?.emit(MessageSocket.MESSAGE_IS_TYPING_STOP, {
                    conversation: { id: conversationId },
                });
                setIsTyping(false);
            }, 2000);
        } else {
            setIsTyping(true);
            socket?.emit(MessageSocket.MESSAGE_IS_TYPING_STOP, {
                conversation: { id: conversationId },
            });
        }
    }, [socket, isTyping, conversationId]);

    return { isRecipientTyping, sendStatusTyping };
};

export default useSocketMessagePrivate;
