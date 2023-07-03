import { User } from "@/types/User";
import Image from "next/image";
import React from "react";

const FriendWithCheckBox = ({
    friend,
    idUsers,
    setIdUsers,
}: {
    friend: User;
    idUsers: number[];
    setIdUsers: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
    const handleAddUser = (id: number) => {
        if (idUsers.includes(id)) {
            setIdUsers((prev) => {
                return prev.filter((idUser) => idUser !== id);
            });
        } else {
            setIdUsers([...idUsers, id]);
        }
    };
    return (
        <li className="w-full border-b last:border-b-0 border-gray-600 bg-gray-700">
            <div
                className="flex items-center pl-3"
                onClick={() => handleAddUser(friend.id)}
            >
                <input
                    type="checkbox"
                    checked={idUsers.includes(friend.id)}
                    onChange={() => handleAddUser(friend.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <div className="w-full py-3 ml-2text-gray-300 cursor-pointer">
                    <div className="w-full px-2">
                        <div className="flex items-center">
                            <div>
                                <div className="tag-item-avatar ">
                                    <Image
                                        src={
                                            friend?.profile?.avatar ??
                                            "/defaultAvatar.png"
                                        }
                                        fill
                                        alt="avatar"
                                    />
                                </div>
                            </div>
                            <div className="ml-2">
                                <p className="text-base font-thin tracking-wide">
                                    {friend?.fullname}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default FriendWithCheckBox;
