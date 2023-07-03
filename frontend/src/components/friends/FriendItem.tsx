import { User } from "@/types/User";
import { mergeClassName } from "@/utils";
import cx from "classnames";
import Image from "next/image";
import { ClassNameValue } from "tailwind-merge";

interface FriendItemProps {
    friendsOnline: User[];
    user: User;
    className?: ClassNameValue;
}

const FriendItem = ({ friendsOnline, user, className }: FriendItemProps) => {
    return (
        <div className={mergeClassName("tag-item", className)}>
            <div
                className={cx({
                    "status-user": Boolean(
                        friendsOnline.find((u) => u.id === user?.id)
                    ),
                })}
            >
                <div className="tag-item-avatar ">
                    <Image
                        src={user?.profile?.avatar ?? "/defaultAvatar.png"}
                        fill
                        alt="avatar"
                    />
                </div>
            </div>
            <div className="ml-2 mr-10 truncate">
                <p className="text-base font-thin tracking-wide truncate">
                    {user?.fullname}
                </p>
            </div>
        </div>
    );
};

export default FriendItem;
