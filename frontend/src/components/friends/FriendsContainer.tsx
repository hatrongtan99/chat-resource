"use client";
import { useAccesstoken } from "@/hook/useAuth";
import FriendTag from "./FriendTag";
import { useQuery } from "@tanstack/react-query";
import { getListFriendsAPI } from "@/api/friends";
import Spinner from "../Spinner";

const FriendsContainer = () => {
    const { id, accessToken } = useAccesstoken();

    const { data, status } = useQuery(["friends", id], () =>
        getListFriendsAPI(accessToken!)
    );

    return (
        <div className="flex flex-col overflow-y-scroll mt-2 basis-full">
            {status === "loading" ? (
                <Spinner />
            ) : (
                <>
                    {data?.data.friends.map((friend) => (
                        <FriendTag data={friend} key={friend.id} />
                    ))}
                </>
            )}
        </div>
    );
};

export default FriendsContainer;
