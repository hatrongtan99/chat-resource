"use client";

import AvatarAndBanner from "@/components/profile/AvatarAndBanner";
import { useAuth } from "@/hook/useAuth";
import { User } from "@/types/User";
import React from "react";

const MeProfilePage = () => {
    const { user } = useAuth();
    return (
        <div>
            <AvatarAndBanner user={user!.user as User} />
            <div className="ml-0 mt-20 md:mt-4 text-center md:text-start md:ml-44 ">
                <h5 className="font-medium text-stone-200">
                    {user!.user.fullname}
                </h5>
            </div>
        </div>
    );
};

export default MeProfilePage;
