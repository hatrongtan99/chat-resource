"use client";
import { ReactNode, useEffect } from "react";
import SocketProvider from "./socket/SocketProvider";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "./QueryProvider";
import ConversationProvider from "./conversations/ConversationProvider";
import FriendsProvider from "./friends/FriendsProvider";
import MessagePrivateProvider from "./message/MessagePrivateProvider";
import AttachmentsProvider from "./attachments/AttachmentsProvider";
import GroupProvider from "./group/GroupProvider";
import GroupMessageProvider from "./groupMessage/GroupMessageProvider";
import ConfigProvider from "./config/ConfigProvider";

const ProvidersContext = ({
    children,
    session,
}: {
    children: ReactNode;
    session: any;
}) => {
    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    return (
        <ConfigProvider>
            <SessionProvider session={session}>
                {/* react query */}
                <QueryProvider>
                    {/* socket  */}
                    <SocketProvider>
                        {/* friend */}
                        <FriendsProvider>
                            {/* conversation */}
                            <ConversationProvider>
                                {/* group */}
                                <GroupProvider>
                                    {/* attachments  */}
                                    <AttachmentsProvider>
                                        {/* group message */}
                                        <GroupMessageProvider>
                                            {/* message private */}
                                            <MessagePrivateProvider>
                                                {children}
                                            </MessagePrivateProvider>
                                        </GroupMessageProvider>
                                    </AttachmentsProvider>
                                </GroupProvider>
                            </ConversationProvider>
                        </FriendsProvider>
                    </SocketProvider>
                </QueryProvider>
            </SessionProvider>
        </ConfigProvider>
    );
};

export default ProvidersContext;
