"use client";

import { SocketContext } from "@/context/socket/SocketProvider";
import { Group } from "@/types/Group";
import { GroupSocket } from "@/utils/constant";
import { useContext, useEffect } from "react";
import useToast from "./useToast";
import { User } from "@/types/User";
import { GroupContext } from "@/context/group/GroupProvider";
import { useAccesstoken } from "./useAuth";

const useSocketGroup = () => {
    const socket = useContext(SocketContext);
    const { id } = useAccesstoken();
    const { deleteGroup, updateGroups } = useContext(GroupContext);
    const { info } = useToast();

    useEffect(() => {
        // new group be created
        socket?.on(GroupSocket.GROUP_NEW, ({ group }: { group: Group }) => {
            if (group.creator.id !== id) {
                info(
                    `Bạn đã được ${group.creator.fullname} thêm vào nhóm "${group.title}"`
                );
            }
            updateGroups(group);
        });

        // new member be added
        socket?.on(
            GroupSocket.GROUP_FRIEND_BE_ADDED,
            ({ group, inviter }: { group: Group; inviter: User }) => {
                info(
                    `Bạn đã được ${inviter.fullname} thêm vào nhóm "${group.title}"`
                );

                updateGroups(group);
            }
        );
        // all exist member in group update when new member added
        socket?.on(
            GroupSocket.GROUP_ADD_FRIEND,
            ({ group }: { group: Group }) => {
                console.log(`group "${group.title}" had added new member`);
                updateGroups(group);
            }
        );

        // member be kicked from group
        socket?.on(
            GroupSocket.GROUP_FRIEND_KICKED,
            ({ group }: { group: Group }) => {
                console.log(`you be kicked from group "${group.title}"`);
                deleteGroup(group);
            }
        );
        // all member in group update when one member is kick
        socket?.on(
            GroupSocket.GROUP_KICK_FRIEND,
            ({ group }: { group: Group }) => {
                console.log(`one member be kicked by owner`);
                updateGroups(group);
            }
        );

        // one friend out group
        socket?.on(
            GroupSocket.GROUP_ONE_FRIEND_OUT_GROUP,
            ({ group }: { group: Group }) => {
                console.log("one member out group");
                updateGroups(group);
            }
        );

        // tranfer owner group
        socket?.on(
            GroupSocket.GROUP_TRANFER_OWNER,
            ({ group }: { group: Group }) => {
                console.log("update owner group");
                if (group.owner.id === id) {
                    info(`Bạn đã được làm trưởng nhóm "${group.title}"`);
                }
                updateGroups(group);
            }
        );

        return () => {
            socket?.off(GroupSocket.GROUP_NEW);
            socket?.off(GroupSocket.GROUP_FRIEND_BE_ADDED);
            socket?.off(GroupSocket.GROUP_ADD_FRIEND);
            socket?.off(GroupSocket.GROUP_FRIEND_KICKED);
            socket?.off(GroupSocket.GROUP_KICK_FRIEND);
            socket?.off(GroupSocket.GROUP_ONE_FRIEND_OUT_GROUP);
            socket?.off(GroupSocket.GROUP_TRANFER_OWNER);
        };
    }, [socket]);
    return null;
};

export default useSocketGroup;
