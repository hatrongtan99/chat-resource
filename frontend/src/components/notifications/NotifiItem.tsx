"use client";
import { useAuth } from "@/hook/useAuth";
import { Friends } from "@/types/Friends";
import Image from "next/image";
import Link from "next/link";

const NotifiItem = ({ data }: { data: Friends }) => {
    const { user } = useAuth();
    return (
        <div className="px-2 mt-1">
            <Link href={`/profile/${data.sender.id}`}>
                <div className="tag-item">
                    <div className="tag-item-avatar">
                        <Image
                            src={
                                user?.user.profile?.avatar ??
                                "/defaultAvatar.png"
                            }
                            fill
                            alt="avatar"
                        />
                    </div>
                    <div className="flex flex-col ml-2 relative grow">
                        <p className="text-xs font-semibold tracking-wide">
                            tan ha{" "}
                            <span className="text-xs font-thin">
                                đã gửi cho bạn lời mời kết bạn.
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default NotifiItem;
