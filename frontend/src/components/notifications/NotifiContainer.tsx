"use client";
import { useQuery } from "@tanstack/react-query";
import NotifiItem from "./NotifiItem";
import { useAccesstoken } from "@/hook/useAuth";
import { getListFriendRequestAPI } from "@/api/friends";
import Spinner from "../Spinner";
export const NotifiContainer = () => {
    const { accessToken, id } = useAccesstoken();
    const { data, status } = useQuery(["list-friend-request", id], () =>
        getListFriendRequestAPI(accessToken!)
    );
    return (
        <div className="w-full flex flex-col grow overflow-auto">
            {status === "loading" ? (
                <Spinner />
            ) : (
                <>
                    {data?.data.friends.map((friend) => (
                        <NotifiItem data={friend} />
                    ))}
                </>
            )}
        </div>
    );
};
