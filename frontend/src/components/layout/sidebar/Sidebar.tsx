"use client";
import Image from "next/image";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";
import NavSidebarWrapper from "./navSidebarWrapper/NavSidebarWrapper";
import { useCallback, useContext, useMemo } from "react";
import { ConversationsContext } from "@/context/conversations/ConversationProvider";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hook/useAuth";
import { FriendsContext } from "@/context/friends/FriendsProvider";
import { GroupContext } from "@/context/group/GroupProvider";
import Link from "next/link";

const SIZE_ICON = "1.25rem";

const Sidebar = () => {
    const { user } = useAuth();
    const { conversationId } = useContext(ConversationsContext);
    const { groupId } = useContext(GroupContext);

    const { numberNotify } = useContext(FriendsContext);
    const pathname = usePathname();

    // ACTIVE PATH
    const acctiveByPathname = useCallback(
        (...arg: string[]): boolean => {
            if (arg.length == 0) return true;

            const pathArray = pathname.split("/");
            let result = false;

            for (const matchString of arg) {
                result = pathArray.some((str) => str === matchString);
                if (result) break;
            }
            return result;
        },
        [pathname]
    );

    const nextUrlExistMessageId = useMemo<string>(() => {
        if (pathname.includes("/conversation") && conversationId) {
            return `/friends/conversation/${conversationId}`;
        } else if (pathname.includes("/groups") && groupId) {
            return `/friends/groups/${groupId}`;
        } else {
            return "/friends";
        }
    }, [pathname, groupId, conversationId]);

    return (
        <aside className="py-4 px-2 bg-[#292725] flex flex-col gap-2 border-r border-gray-900 overflow-x-visible">
            <NavSidebarWrapper
                active={acctiveByPathname("conversations", "conversation")}
                tooltip="Message"
                badge={10}
                link={"/conversations"}
            >
                <BsFillChatDotsFill size={SIZE_ICON} />
            </NavSidebarWrapper>

            <NavSidebarWrapper
                active={acctiveByPathname("groups")}
                tooltip="Nhóm"
                badge={0}
                link={"/groups"}
            >
                <HiChatBubbleLeftRight size={SIZE_ICON} />
            </NavSidebarWrapper>

            <NavSidebarWrapper
                active={acctiveByPathname("notifications")}
                tooltip="Thông báo"
                badge={numberNotify}
                link={"/notifications"}
            >
                <IoNotifications size={SIZE_ICON} />
            </NavSidebarWrapper>

            <NavSidebarWrapper
                active={acctiveByPathname("friends", "profile")}
                tooltip="Bạn bè"
                badge={0}
                link={nextUrlExistMessageId}
            >
                <MdGroups2 size={SIZE_ICON} />
            </NavSidebarWrapper>

            <div className="mt-auto ">
                <Link href="/profile/me">
                    <div className="overflow-hidden w-10 h-10 rounded-full relative">
                        <Image
                            src={
                                user?.user.profile?.avatar ??
                                "/defaultAvatar.png"
                            }
                            fill
                            alt="avatar"
                        />
                    </div>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
