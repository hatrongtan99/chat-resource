"use client";

import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import FriendsContainer from "@/components/friends/FriendsContainer";
import LeftResizeable from "@/components/leftResizeable";
import SearchFriends from "@/components/search/searchFriends";
import SearchFriendsResult from "@/components/search/searchFriends/SearchFriendsResult";
import { ReactNode, useState } from "react";

const layout = ({
    children,
    friendsId,
}: {
    children: ReactNode;
    friendsId: ReactNode;
}) => {
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
            <div className="grow flex flex-col h-[100vh]">
                {children}
                {friendsId}
            </div>
        </div>
    );
};

export default layout;
