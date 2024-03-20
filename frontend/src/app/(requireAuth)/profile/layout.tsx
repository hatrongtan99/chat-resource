"use client";

import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import FriendsContainer from "@/components/friends/FriendsContainer";
import LeftResizeable from "@/components/leftResizeable";
import SearchFriends from "@/components/search/searchFriends";
import SearchFriendsResult from "@/components/search/searchFriends/SearchFriendsResult";
import React, { ReactNode, useState } from "react";

const layout = ({ children }: { children: ReactNode }) => {
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
                {children}
            </div>
        </div>
    );
};

export default layout;
