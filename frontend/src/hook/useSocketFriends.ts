"use client";

import { SocketContext } from "@/context/socket/SocketProvider";
import { useContext } from "react";
import { useEffect } from "react";
import { FriendSocketEvent } from "../utils/constant";
import { Friends } from "@/types/Friends";
import useToast from "./useToast";
import { FriendsContext } from "@/context/friends/FriendsProvider";

const useSocketFriends = () => {
    const socket = useContext(SocketContext);
    const { setNumberNotify, setFriendsOnline } = useContext(FriendsContext);
    const { success, info } = useToast();

    useEffect(() => {
        socket?.on(FriendSocketEvent.FRIEND_NEW_REQUEST, (payload: Friends) => {
            info(`${payload.sender.fullname} đã gửi yêu cầu kết bạn!`);
            setNumberNotify((prev) => prev + 1);
            console.log(
                `${payload.sender.email} send friend request to ${payload.receiver.email}`
            );
        });

        socket?.on(
            FriendSocketEvent.FRIEND_ACCEPTED_REQUEST,
            (payload: Friends) => {
                info(
                    `${payload.receiver.fullname} đã chấp nhận yêu cầu kết bạn!`
                );
                console.log(
                    `${payload.receiver.email} accept friend request!!! of ${payload.sender.email}`
                );
            }
        );

        socket?.emit(FriendSocketEvent.FRIEND_GET_FRIENDS_ONLINE);
        socket?.on(FriendSocketEvent.FRIEND_GET_FRIENDS_ONLINE, (data) => {
            setFriendsOnline(data);
        });

        return () => {
            socket?.off(FriendSocketEvent.FRIEND_NEW_REQUEST);
            socket?.off(FriendSocketEvent.FRIEND_ACCEPTED_REQUEST);
        };
    }, [socket]);
    return null;
};

export default useSocketFriends;
