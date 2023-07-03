"use client";
import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import FriendsContainer from "@/components/friends/FriendsContainer";
import LeftResizeable from "@/components/leftResizeable";
import SearchFriends from "@/components/search/searchFriends";
import SearchFriendsResult from "@/components/search/searchFriends/SearchFriendsResult";
import { useState } from "react";

const page = () => {
    const [textSearch, setTextSearch] = useState("");
    return (
        <div className="flex w-full">
            <LeftResizeable className="flex flex-col basis-1/3 border-r border-darkHover h-[100vh]">
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
        </div>
    );
};

export default page;
