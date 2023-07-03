"use client";

import { GroupMessageContext } from "@/context/groupMessage/GroupMessageProvider";
import { MessagePrivateContext } from "@/context/message/MessagePrivateProvider";
import { SocketContext } from "@/context/socket/SocketProvider";
import { DeleteMessagePayload, NewMessagePayload } from "@/types/Conversations";
import { NewGroupMessagePayload } from "@/types/Group";
import { GroupMessageSocket, MessageSocket } from "@/utils/constant";
import { useContext, useEffect } from "react";

const useSocketMessages = () => {
    const socket = useContext(SocketContext);
    const { addNewMessageConversation, deleteMessageConversation } = useContext(
        MessagePrivateContext
    );
    const { addNewMessageGroup } = useContext(GroupMessageContext);

    useEffect(() => {
        // on new message private
        socket?.on(
            MessageSocket.MESSAGE_PRIVATE_ON_MESSAGE,
            (payload: NewMessagePayload) => {
                console.log("new message ::::", payload);
                addNewMessageConversation(payload);
            }
        );

        // on delete mesage private
        socket?.on(
            MessageSocket.MESSAGE_PRIVATE_ON_DELETE,
            (payload: DeleteMessagePayload) => {
                console.log(
                    "delete one message private of conversationId: ",
                    payload.conversationId
                );
                deleteMessageConversation(payload);
            }
        );

        return () => {
            socket?.off(MessageSocket.MESSAGE_PRIVATE_ON_MESSAGE);
            socket?.off(MessageSocket.MESSAGE_PRIVATE_ON_DELETE);
        };
    }, [socket]);

    useEffect(() => {
        // on new message group
        socket?.on(
            GroupMessageSocket.GROUP_MESSAGE_ON_NEW,
            (payload: NewGroupMessagePayload) => {
                console.log("new group message :::", payload);

                addNewMessageGroup(payload);
            }
        );

        return () => {
            socket?.off(GroupMessageSocket.GROUP_MESSAGE_ON_NEW);
        };
    }, [socket]);

    return null;
};

export default useSocketMessages;
