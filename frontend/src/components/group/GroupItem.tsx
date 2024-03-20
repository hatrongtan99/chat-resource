"use client";

import { GroupContext } from "@/context/group/GroupProvider";
import { Group } from "@/types/Group";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";

const GroupItem = ({ data }: { data: Group }) => {
    const params = useParams();
    const { setGroupId } = useContext(GroupContext);
    return (
        <div className="px-2 mt-1">
            <Link
                href={`/groups/${data.id}`}
                onClick={() => setGroupId(data.id)}
            >
                <div
                    className={cx("tag-item ", {
                        active: parseInt(params?.groupId) === data.id,
                    })}
                >
                    <div className="tag-item-avatar">
                        <Image
                            src={data.avatar ?? "/defaultAvatar.png"}
                            fill
                            alt="avatar"
                        />
                    </div>

                    <div className="flex flex-col ml-2 relative grow">
                        <p className="name-conversation">{data.title}</p>

                        {/* last message */}
                        {/* {data.lastMessageSent && (
                            <p className="text-sm font-thin text-gray-400">
                                {data.lastMessageSent?.author?.id ===
                                user?.user.id
                                    ? `Bạn: ${user.user.fullname}: ${data.lastMessageSent.content}`
                                    : `${data.lastMessageSent?.author?.fullname}: ${data.lastMessageSent.content}`}
                            </p>
                        )} */}

                        <div className="absolute rounded-full bottom-1/2 translate-y-1/2 right-0 overflow-hidden shrink-0">
                            {/* <Image
                                src={
                                    ortherProfile.profile?.avatar ??
                                    "/defaultAvatar.png"
                                }
                                height={10}
                                width={10}
                                alt="seen"
                            /> */}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default GroupItem;
