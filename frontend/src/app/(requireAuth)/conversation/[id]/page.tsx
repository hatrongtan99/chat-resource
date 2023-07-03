import ConversationsContainer from "@/components/conversations/ConversationsContainer";
import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import React from "react";
import LeftResizeable from "@/components/leftResizeable";
import SearchConversations from "@/components/search/searchConversations/SearchConversations";
import MessagePrivateWrapper from "@/components/messages/MessagePrivateWrapper";

const page = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <div className="flex ">
            <LeftResizeable>
                <TopWithLable lable="Chats" />
                <SearchConversations />

                <ConversationsContainer />
            </LeftResizeable>
            <MessagePrivateWrapper conversationId={parseInt(id)} />
        </div>
    );
};

export default page;
