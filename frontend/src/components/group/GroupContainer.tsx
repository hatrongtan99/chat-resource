"use client";

import { GroupContext } from "@/context/group/GroupProvider";
import React, { useContext } from "react";
import Spinner from "../Spinner";
import GroupItem from "./GroupItem";

const GroupContainer = () => {
    const { groups, status } = useContext(GroupContext);

    return (
        <div className="flex flex-col overflow-y-scroll mt-2 ">
            {status === "loading" ? (
                <Spinner />
            ) : (
                <>
                    {groups.map((group, index) => (
                        <GroupItem data={group} key={index} />
                    ))}
                </>
            )}
        </div>
    );
};

export default GroupContainer;
