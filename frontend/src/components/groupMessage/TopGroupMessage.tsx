"use client";

import { Group } from "@/types/Group";
import Image from "next/image";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCameraVideoFill, BsFillTelephoneFill } from "react-icons/bs";
import GroupMessageMenuButton from "./groupMessageMenu/GroupMessageMenu";

const SIZE_ICON = "1rem";

const TopGroupMessage = ({ group }: { group: Group }) => {
    return (
        <div className="w-full h-auto mt-4 flex justify-between items-center pb-2 px-4 border-b border-gray-400">
            <div className="flex justify-start items-center">
                <div className="w-9 h-9 relative rounded-full overflow-hidden">
                    <Image
                        src={group?.avatar ?? "/defaultAvatar.png"}
                        alt="avatar"
                        fill
                    />
                </div>

                <p className="text-base font-thin tracking-wider ml-2">
                    {group?.title}
                </p>
            </div>
            <div className="flex justify-end items-center gap-2">
                <div className="btn-icon">
                    <BsFillTelephoneFill size={SIZE_ICON} />
                </div>
                <div className="btn-icon">
                    <BsCameraVideoFill size={SIZE_ICON} />
                </div>
                <div className="btn-icon">
                    <AiOutlineSearch size={SIZE_ICON} />
                </div>

                <GroupMessageMenuButton
                    SIZE_ICON={SIZE_ICON}
                    groupId={group.id}
                />
            </div>
        </div>
    );
};

export default TopGroupMessage;
