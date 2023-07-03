"use client";

import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import FriendsContainer from "@/components/friends/FriendsContainer";
import LeftResizeable from "@/components/leftResizeable";
import ProfileWrapper from "@/components/profile/ProfileWrapper";
import SearchFriends from "@/components/search/searchFriends";
import SearchFriendsResult from "@/components/search/searchFriends/SearchFriendsResult";

import { useState } from "react";

const page = ({ params: { idFriend } }: { params: { idFriend: string } }) => {
    const [textSearch, setTextSearch] = useState("");

    return (
        <div className="flex w-full h-full">
            <LeftResizeable>
                <TopWithLable lable="Friends" />
                <SearchFriends
                    textSearch={textSearch}
                    setTextSearch={setTextSearch}
                />
                {!!textSearch ? (
                    <SearchFriendsResult textSearch={textSearch} />
                ) : (
                    <FriendsContainer />
                )}
            </LeftResizeable>
            <div className="grow lg:mx-20 mx-5 2xl:mx-80 xl:mx-60">
                <ProfileWrapper idFriend={parseInt(idFriend)} />
            </div>
        </div>
    );
};

export default page;
