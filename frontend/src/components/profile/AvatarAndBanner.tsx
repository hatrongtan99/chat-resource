"use client";
import { User } from "@/types/User";
import Image from "next/image";
import { HiOutlinePencilAlt } from "react-icons/hi";

import React from "react";
import { useAccesstoken } from "@/hook/useAuth";

const AvatarAndBanner = ({ user }: { user: User | undefined }) => {
    const { id } = useAccesstoken();

    return (
        <div className="relative h-[260px]">
            <div
                className="h-full w-full absolute bg-darkLight rounded-b-lg overflow-hidden"
                id="banner"
            >
                {user?.profile?.banner && (
                    <Image src={user.profile.banner} fill alt="banner" />
                )}
            </div>
            <div
                className="absolute left-1/2 -translate-x-1/2 md:left-10 md:-translate-x-0 top-[200px] w-32 h-32 rounded-full shrink-0 overflow-hidden border-2 border-stone-600"
                id="avatar"
            >
                <Image
                    src={user?.profile?.avatar ?? "/defaultAvatar.png"}
                    alt="avatar"
                    fill
                />
            </div>
        </div>
    );
};

export default AvatarAndBanner;
