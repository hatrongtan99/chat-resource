"use client";
import { User } from "@/types/User";
import Image from "next/image";
import React from "react";

const AvatarAndBanner = ({ user }: { user: User | undefined }) => {
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
                className="absolute left-10 top-[200px] w-32 h-32 rounded-full shrink-0 overflow-hidden border-2 border-stone-600"
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
