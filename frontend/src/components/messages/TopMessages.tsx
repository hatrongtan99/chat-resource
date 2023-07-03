"use client";

import Image from "next/image";
import React, { memo, useMemo } from "react";
import { BsFillTelephoneFill, BsCameraVideoFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { Conversation } from "@/types/Conversations";
import { User } from "@/types/User";
import { useAccesstoken } from "@/hook/useAuth";
import Link from "next/link";

const SIZE_ICON = "1rem";

const TopMessages = ({ conversation }: { conversation?: Conversation }) => {
    const { id } = useAccesstoken();

    const ortherProfile: User | undefined = useMemo(() => {
        return id === conversation?.creator.id
            ? conversation?.recipter
            : conversation?.creator;
    }, [conversation]);

    return (
        <div className="w-full h-auto mt-4 flex justify-between items-center pb-2 px-4 border-b border-gray-400">
            <Link href={`/profile/${ortherProfile?.id}`}>
                <div className="flex justify-start items-center">
                    <div className="w-9 h-9 relative rounded-full overflow-hidden">
                        <Image
                            src={
                                ortherProfile?.profile?.avatar ??
                                "/defaultAvatar.png"
                            }
                            alt="avatar"
                            fill
                        />
                    </div>

                    <p className="text-base font-thin tracking-wider ml-2">
                        {ortherProfile?.fullname}
                    </p>
                </div>
            </Link>

            <div className="flex justify-end items-center gap-2">
                <div className="p-2 rounded-full hover:bg-darkLight cursor-pointer">
                    <BsFillTelephoneFill size={SIZE_ICON} />
                </div>
                <div className="p-2 rounded-full hover:bg-darkLight cursor-pointer">
                    <BsCameraVideoFill size={SIZE_ICON} />
                </div>
                <div className="p-2 rounded-full hover:bg-darkLight cursor-pointer">
                    <AiOutlineSearch size={SIZE_ICON} />
                </div>
            </div>
        </div>
    );
};

export default memo(TopMessages);
