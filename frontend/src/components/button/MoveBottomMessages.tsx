"use client";

import React, { RefObject } from "react";
import { BsArrowDownShort } from "react-icons/bs";

const MoveBottomMessages = ({
    refParrent,
}: {
    refParrent: RefObject<HTMLDivElement>;
}) => {
    return (
        <div
            onClick={() => {
                refParrent.current?.scrollTo({
                    top: refParrent.current.scrollHeight,
                    behavior: "smooth",
                });
            }}
            className="absolute border border-gray-500 bg-darkLight rounded-full p-2 bottom-2 left-1/2 -translate-x-1/2 cursor-pointer hover:bg-darkHover opacity-80 animate-bounce"
        >
            <BsArrowDownShort size="1.2rem" color="white" />
        </div>
    );
};

export default MoveBottomMessages;
