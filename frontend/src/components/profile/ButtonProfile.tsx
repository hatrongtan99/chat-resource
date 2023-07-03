import React, { useMemo } from "react";
import Button from "../customs/Button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { User } from "@/types/User";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    acceptFriendRequestAPI,
    cancelFriendRequestAPI,
    createFriendRequestAPI,
    unfriendAPI,
} from "@/api/friends";
import {
    AcceptRequestFriendParams,
    CancelRequestFriendParams,
    CreateRequestFriendParams,
    Friends,
    StatusFriend,
    UnfriendParams,
} from "@/types/Friends";
import { useAccesstoken } from "@/hook/useAuth";
import useToast from "@/hook/useToast";
import { findOrcreateConversationAPI } from "@/api/conversations";
import { redirect, useRouter } from "next/navigation";

const ICON_SIZE = "1rem";
const ButtonProfile = ({
    user,
    statusFriend,
}: {
    user: User | undefined;
    statusFriend: Friends | null;
}) => {
    const { accessToken, id } = useAccesstoken();
    const { success } = useToast();
    const queryClient = useQueryClient();
    const router = useRouter();

    // create friend request
    const { mutate: createFriendRequest } = useMutation(
        (body: CreateRequestFriendParams) =>
            createFriendRequestAPI(accessToken!, body),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["profile-friend", user?.id]);
                success("Đã gửi lời mời kết bạn!");
            },
        }
    );

    // accept friend request
    const { mutate: acceptFriendRequest } = useMutation(
        (body: AcceptRequestFriendParams) =>
            acceptFriendRequestAPI(accessToken!, body),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["profile-friend", user?.id]);
                queryClient.invalidateQueries(["friends", id]);
            },
        }
    );

    // cancel friend request
    const { mutate: cancelFriendRequest } = useMutation(
        (body: CancelRequestFriendParams) =>
            cancelFriendRequestAPI(accessToken!, body),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["profile-friend", user?.id]);
            },
        }
    );

    // unfriend
    const { mutate: handleUnfriend } = useMutation(
        (body: UnfriendParams) => unfriendAPI(accessToken!, body),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["profile-friend", user?.id]);
                queryClient.invalidateQueries(["friends", id]);
            },
        }
    );

    // find or cretae new Conversation
    const { mutate: hanldeFindOrCreateConversation } = useMutation(
        () => findOrcreateConversationAPI(accessToken!, user?.id!),
        {
            onSuccess: (data) => {
                if (data.data.success) {
                    const { id } = data.data.conversation;
                    router.push(`/conversation/${id}`);
                }
            },
        }
    );

    const statusRelation: null | StatusFriend = useMemo(() => {
        if (statusFriend === null) return null;
        return statusFriend.status;
    }, [statusFriend]);

    return (
        <div className="flex">
            <Button
                size="sm"
                className="mr-2"
                as="button"
                onClick={() => hanldeFindOrCreateConversation()}
            >
                <BsFillChatDotsFill size={ICON_SIZE} className="mr-1" />
                Nhắn tin
            </Button>

            {statusRelation === StatusFriend.ACCEPTED && (
                <Button
                    size="sm"
                    as="button"
                    onClick={() => handleUnfriend({ ortherId: user?.id! })}
                >
                    Huỷ kết bạn
                </Button>
            )}

            {statusRelation === StatusFriend.PENDING &&
            statusFriend?.sender.id === id ? (
                <Button
                    size="sm"
                    disabled
                    as="button"
                    onClick={() => cancelFriendRequest({ ortherId: user?.id! })}
                >
                    <AiOutlineUserAdd size={ICON_SIZE} className="mr-1" />
                    Huỷ lời mời
                </Button>
            ) : (
                statusRelation === StatusFriend.PENDING && (
                    <>
                        <Button
                            size="sm"
                            as="button"
                            onClick={() =>
                                acceptFriendRequest({ ortherId: user?.id! })
                            }
                            className="mr-2"
                        >
                            <AiOutlineUserAdd
                                size={ICON_SIZE}
                                className="mr-1"
                            />
                            Chấp nhận
                        </Button>
                        <Button
                            size="sm"
                            disabled
                            as="button"
                            onClick={() =>
                                cancelFriendRequest({ ortherId: user?.id! })
                            }
                        >
                            <AiOutlineUserAdd
                                size={ICON_SIZE}
                                className="mr-1"
                            />
                            Xoá
                        </Button>
                    </>
                )
            )}

            {(statusRelation === StatusFriend.REJECTED ||
                statusFriend == null) && (
                <Button
                    size="sm"
                    as="button"
                    onClick={() => createFriendRequest({ receicId: user?.id! })}
                >
                    <AiOutlineUserAdd size={ICON_SIZE} className="mr-1" />
                    Kết bạn
                </Button>
            )}
        </div>
    );
};

export default ButtonProfile;
