"use client";

import { getListFriendsAPI } from "@/api/friends";
import { addFriendsToGroupApi } from "@/api/group";
import Spinner from "@/components/Spinner";
import Button from "@/components/customs/Button";
import FriendWithCheckBox from "@/components/friends/friendWithCheckBox/FriendWithCheckBox";
import { useAccesstoken } from "@/hook/useAuth";
import { AddFriendToGroupParams } from "@/types/Group";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MouseEvent, useState } from "react";

const AddMemberGroup = ({ groupId }: { groupId: number }) => {
    const { id, accessToken } = useAccesstoken();
    const [idUsers, setIdUsers] = useState<number[]>([]);

    const { data, status } = useQuery(["friends", id], () =>
        getListFriendsAPI(accessToken!)
    );

    const { mutate: handleSubmit } = useMutation(
        [
            `add-friends-group-${groupId}`,
            { usersIdList: idUsers },
            { userId: id },
        ],
        (body: AddFriendToGroupParams) =>
            addFriendsToGroupApi(accessToken!, body)
    );

    return (
        <form className="flex flex-col rounded-lg p-6 bg-darkLight mx-auto min-w-[300px] md:min-w-[400px]">
            <label className="block mb-2 text-sm font-medium text-stone-300 ">
                Bạn bè
            </label>
            {status === "loading" ? (
                <Spinner />
            ) : (
                <ul className="w-full h-[500px] rounded-lg overflow-hidden overflow-y-scroll">
                    {data?.data.friends.map((friend) => {
                        return (
                            <FriendWithCheckBox
                                friend={friend}
                                idUsers={idUsers}
                                setIdUsers={setIdUsers}
                            />
                        );
                    })}
                </ul>
            )}
            <div className="w-full flex justify-end mt-4">
                <Button
                    as="button"
                    onClick={(e: MouseEvent) => {
                        e.preventDefault();
                        handleSubmit({
                            groupId,
                            usersIdList: idUsers.map((id) => ({ id })),
                        });
                    }}
                >
                    Thêm bạn bè
                </Button>
            </div>
        </form>
    );
};

export default AddMemberGroup;
