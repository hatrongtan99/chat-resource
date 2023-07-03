"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import AvatarAndBanner from "./AvatarAndBanner";
import ButtonProfile from "./ButtonProfile";
import { useAccesstoken } from "@/hook/useAuth";
import { getFriendProfile } from "@/api/friends";
import Spinner from "../Spinner";

const ProfileWrapper = ({ idFriend }: { idFriend: number }) => {
    const { accessToken, id } = useAccesstoken();

    const queryClient = useQueryClient();

    const { data, status } = useQuery(["profile-friend", idFriend], () =>
        getFriendProfile(accessToken!, idFriend)
    );

    return (
        <>
            {status === "loading" ? (
                <Spinner />
            ) : (
                <>
                    <AvatarAndBanner user={data?.data.friend} />
                    <div className="mt-4 float-right">
                        <ButtonProfile
                            user={data?.data.friend}
                            statusFriend={data?.data.status ?? null}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default ProfileWrapper;
