"use client";
import ConversationItem from "./ConversationItem";
import { useContext } from "react";
import Spinner from "../Spinner";
import { ConversationsContext } from "@/context/conversations/ConversationProvider";

const ConversationsContainer = () => {
    const { conversations, status } = useContext(ConversationsContext);
    return (
        <div className="flex flex-col overflow-y-scroll mt-2 grow">
            {status === "loading" ? (
                <Spinner />
            ) : (
                <>
                    {conversations.map((conversation, index) => (
                        <ConversationItem
                            key={conversation.id}
                            data={conversation}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default ConversationsContainer;
