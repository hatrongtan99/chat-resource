"use client";
import cx from "classnames";
import { ConversationsContext } from "@/context/conversations/ConversationProvider";
import { useAuth } from "@/hook/useAuth";
import { Conversation } from "@/types/Conversations";
import { User } from "@/types/User";
import Image from "next/image";
import Link from "next/link";
import { useContext, useMemo } from "react";
import { useParams } from "next/navigation";
import { FriendsContext } from "@/context/friends/FriendsProvider";

const ConversationItem = ({ data }: { data: Conversation }) => {
    const { user } = useAuth();
    const { setConversationId } = useContext(ConversationsContext);
    const { friendsOnline } = useContext(FriendsContext);
    const params = useParams();

    const ortherProfile = useMemo<User>(() => {
        if (user?.user.id === data.creator.id) return data.recipter;
        return data.creator;
    }, [user, data]);

    return (
        <div className="px-2 mt-1 ">
            <Link
                href={`/conversation/${data.id}`}
                onClick={() => {
                    setConversationId(data.id);
                }}
            >
                <div
                    className={cx("tag-item ", {
                        active: parseInt(params?.id) === data.id,
                    })}
                >
                    <div
                        className={cx({
                            "status-user": Boolean(
                                friendsOnline.find(
                                    (user) => user.id === ortherProfile.id
                                )
                            ),
                        })}
                    >
                        <div className="tag-item-avatar">
                            <Image
                                src={
                                    ortherProfile.profile?.avatar ??
                                    "/defaultAvatar.png"
                                }
                                fill
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col ml-2 relative grow">
                        <p className="name-conversation">
                            {ortherProfile.fullname}
                        </p>

                        {data.lastMessageSent && (
                            <p className="text-sm font-thin text-gray-400">
                                {/* {data.lastMessageSent.author.id ===
                                user?.user.id
                                    ? `Bạn: ${user.user.fullname}: ${data.lastMessageSent.content}`
                                    : `${ortherProfile.fullname}: ${data.lastMessageSent.content}`} */}
                            </p>
                        )}

                        <div className="absolute rounded-full bottom-1/2 translate-y-1/2 right-0 overflow-hidden shrink-0">
                            <Image
                                src={
                                    ortherProfile.profile?.avatar ??
                                    "/defaultAvatar.png"
                                }
                                height={10}
                                width={10}
                                alt="seen"
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ConversationItem;
