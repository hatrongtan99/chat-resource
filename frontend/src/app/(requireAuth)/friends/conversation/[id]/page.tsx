import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import FriendsContainer from "@/components/friends/FriendsContainer";
import LeftResizeable from "@/components/leftResizeable";
import MessagePrivateWrapper from "@/components/messages/MessagePrivateWrapper";
import React from "react";

const page = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <div className="flex">
            <LeftResizeable>
                <TopWithLable lable="Friends" />
                <FriendsContainer />
            </LeftResizeable>
            <div className="grow flex flex-col h-[100vh]">
                <MessagePrivateWrapper conversationId={parseInt(id)} />
            </div>
        </div>
    );
};

export default page;
