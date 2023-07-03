"use client";
import Link from "next/link";
import { User } from "@/types/User";
import { useContext } from "react";
import { FriendsContext } from "@/context/friends/FriendsProvider";
import FriendItem from "./FriendItem";

const FriendTag = ({ data }: { data: User }) => {
    const { friendsOnline } = useContext(FriendsContext);
    return (
        <div className="mt-1 w-full px-2">
            <Link href={`/profile/${data?.id}`}>
                <FriendItem friendsOnline={friendsOnline} user={data} />
            </Link>
        </div>
    );
};

export default FriendTag;
