"use client";

import { getListFriendsAPI } from "@/api/friends";
import Spinner from "@/components/Spinner";
import Button from "@/components/customs/Button";
import ModalPopup from "@/components/common/modal/ModalPopup";
import { GroupContext } from "@/context/group/GroupProvider";
import { useAccesstoken } from "@/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, MouseEvent, useContext, useState } from "react";
import useToast from "@/hook/useToast";
import FriendWithCheckBox from "@/components/friends/friendWithCheckBox/FriendWithCheckBox";

interface CreateNewGroupFormProps {
    handleClick: () => void;
}

const CreateNewGroupForm = ({ handleClick }: CreateNewGroupFormProps) => {
    const { handleCreateNewGroup } = useContext(GroupContext);
    const { accessToken, id } = useAccesstoken();

    const [title, setTitle] = useState("");
    const [idUsers, setIdUsers] = useState<number[]>([]);
    const [avatar, setAvatar] = useState<File | null>(null);
    const { error } = useToast();

    const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;
        setAvatar(files[0]);
        e.target.value = "";
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!title.trim()) {
            return error("Bạn phải đặt tên nhóm!!!");
        }
        if (idUsers.length === 0) {
            return error("Bạn phải thêm bạn bè vào nhóm!!!");
        }
        await handleCreateNewGroup(
            {
                title,
                users: idUsers.map((id) => ({ id })),
                avatar: avatar!,
            },
            handleClick
        );
    };

    const { data, status } = useQuery(["friends", id], () =>
        getListFriendsAPI(accessToken!)
    );

    return (
        <ModalPopup handleClick={handleClick}>
            <div className="rounded-lg p-6 bg-darkLight mx-auto min-w-[300px] md:min-w-[500px]">
                <form>
                    <div className="mb-6">
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-white "
                        >
                            Tên nhóm
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="block w-full p-2 tetx-gray-900 border rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="avatar"
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            Ảnh nền
                        </label>
                        <input
                            id="avatar"
                            onChange={handleChangeAvatar}
                            type="file"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium  text-white ">
                            Bạn bè
                        </label>
                        <div className="w-full min-h-[100px] max-h-[300px] overflow-y-scroll">
                            {status === "loading" ? (
                                <Spinner />
                            ) : (
                                <ul className="w-full h-fit text-sm font-medium text-white border border-gray-600 rounded-lg overflow-y-auto">
                                    {data?.data.friends.map((friend) => {
                                        return (
                                            <FriendWithCheckBox
                                                idUsers={idUsers}
                                                setIdUsers={setIdUsers}
                                                friend={friend}
                                            />
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex justify-end">
                        <Button as="button" onClick={handleSubmit}>
                            Tạo mới
                        </Button>
                    </div>
                </form>
            </div>
        </ModalPopup>
    );
};

export default CreateNewGroupForm;
