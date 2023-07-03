"use client";
import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchFriends = ({
    textSearch,
    setTextSearch,
}: {
    textSearch: string;
    setTextSearch: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="mx-2 relative">
            <div className="border-2 border-stone-400 flex items-center bg-bgDarkmodeComment rounded-sm focus-within:border-2 focus-within:border-cyan-900 transition-colors">
                <div className="p-0.5 text-darkLight">
                    <AiOutlineSearch size="1rem" />
                </div>
                <input
                    type="text"
                    className="outline-none border-none w-full pl-1 bg-inherit text-xs font-thin"
                    placeholder="Search"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchFriends;
