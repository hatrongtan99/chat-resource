import React, { ReactNode } from "react";

const LayoutConversations = ({
    conversationId,
    children,
}: {
    conversationId: ReactNode;
    children: ReactNode;
    params: {
        id: number;
    };
}) => {
    return (
        <div className="flex h-full">
            {children}
            {conversationId}
        </div>
    );
};

export default LayoutConversations;
