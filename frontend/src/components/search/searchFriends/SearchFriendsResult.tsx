"use client";
import FriendTag from "@/components/friends/FriendTag";
import { useQuery } from "@tanstack/react-query";
import { searchFriendsAPI } from "@/api/friends";
import { useAccesstoken, useReloadSession } from "@/hook/useAuth";
import useDebounce from "@/hook/useDebounce";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

const SearchFriendsResult = ({ textSearch }: { textSearch: string }) => {
    const { accessToken, id } = useAccesstoken(textSearch);

    const valueSearch = useDebounce(textSearch);
    const [isLoad, setIsLoad] = useState(true);

    const { data: friends, status } = useQuery(
        ["search-friends", valueSearch],
        () => searchFriendsAPI(accessToken!, valueSearch),
        { enabled: Boolean(valueSearch.trim()) }
    );

    useEffect(() => {
        if (valueSearch === textSearch && status === "success") {
            setIsLoad(false);
        } else {
            setIsLoad(true);
        }
    }, [valueSearch, textSearch, status]);

    return (
        <div className="flex flex-col overflow-y-scroll mt-2 basis-full">
            {isLoad ? (
                <Spinner />
            ) : (
                <div>
                    {friends?.data.map((friend) => (
                        <FriendTag data={friend} key={friend.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchFriendsResult;
