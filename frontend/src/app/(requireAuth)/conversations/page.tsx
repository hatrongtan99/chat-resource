import ConversationsContainer from "@/components/conversations/ConversationsContainer";
import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import LeftResizeable from "@/components/leftResizeable";
import SearchConversations from "@/components/search/searchConversations/SearchConversations";

const page = async () => {
    return (
        <LeftResizeable>
            <TopWithLable lable="Chats" />
            <SearchConversations />
            <ConversationsContainer />
        </LeftResizeable>
    );
};

export default page;
