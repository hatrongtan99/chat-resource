"use client";

import { GroupContext } from "@/context/group/GroupProvider";
import { useContext, useMemo } from "react";
import MemberGroupItem from "./MemberGroupItem";

interface ListMemberGroupProps {
    groupId: number;
}
const ListMemberGroup = ({ groupId }: ListMemberGroupProps) => {
    const { getGroup } = useContext(GroupContext);

    const group = useMemo(() => {
        const currentGroup = getGroup(groupId);
        const owner = currentGroup.owner;
        currentGroup.users = currentGroup.users.filter(
            (user) => user.id !== owner.id
        );
        currentGroup.users.unshift(owner);
        return currentGroup;
    }, [groupId]);

    return (
        <div className="rounded-lg p-6 bg-darkLight mx-auto min-w-[300px] md:min-w-[400px] overflow-y-scroll h-[600px]">
            <div className="w-full h-fit ">
                {group.users.map((user) => {
                    return (
                        <MemberGroupItem
                            user={user}
                            group={group}
                            key={user.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ListMemberGroup;
