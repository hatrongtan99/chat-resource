"use client";

import { findOrcreateConversationAPI } from "@/api/conversations";
import { kickFriendFromGroup, tranferOwnerApi } from "@/api/group";
import ButtonMenu from "@/components/button/ButtonMenu";
import ButtonWithHandleClickOutside from "@/components/common/buttonWithHandleClickOutside/ButtonWithHandleClickOutside";
import MenuContainer from "@/components/common/menu/MenuContainer";
import DialogWithModal from "@/components/customs/dialog/DialogWithModal";
import FriendItem from "@/components/friends/FriendItem";
import { useAccesstoken } from "@/hook/useAuth";
import useToast from "@/hook/useToast";
import {
    Group,
    KickOutFriendFromGroupParams,
    TranferOwnerGroupParams,
} from "@/types/Group";
import { User } from "@/types/User";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaCrown } from "react-icons/fa";

const MemberGroupItem = ({ user, group }: { user: User; group: Group }) => {
    const router = useRouter();

    const { success } = useToast();

    const { accessToken, id } = useAccesstoken();

    const { mutate: handleFindOrCreateConversation } = useMutation(
        () => findOrcreateConversationAPI(accessToken!, user.id),
        {
            onSuccess: (data) => {
                if (data.data.success) {
                    const { id } = data.data.conversation;
                    router.push(`/conversation/${id}`);
                }
            },
        }
    );

    const { mutate: handleKickFriendFromGroup } = useMutation(
        (body: KickOutFriendFromGroupParams) =>
            kickFriendFromGroup(accessToken!, body)
    );

    const { mutate: handleTranferOwner } = useMutation(
        (body: TranferOwnerGroupParams) => tranferOwnerApi(accessToken!, body),
        {
            onSuccess(data) {
                if (data.data.success) {
                }
            },
        }
    );

    return (
        <div className="mb-4 last:mb-0 relative group/item">
            {user.id === group.owner.id && (
                <div className="absolute">
                    <FaCrown size="0.8rem" />
                </div>
            )}
            {user.id !== id && (
                <ButtonWithHandleClickOutside
                    buttonChildren={
                        <ButtonMenu
                            SIZE_ICON="1rem"
                            className="hover:bg-stone-400 hover:text-lg"
                        />
                    }
                    position="absolute"
                    className="right-2 top-[20%] group-hover/item:visible peer/button-menu "
                    invisiable
                >
                    <MenuContainer>
                        <ul className="flex flex-col">
                            <li
                                className="menu-item mb-1.5 last:mb-0"
                                onClick={() => handleFindOrCreateConversation()}
                            >
                                <AiFillMessage size="1rem" />
                                <span className="ml-2 whitespace-nowrap text-stone-300">
                                    Nhắn Tin
                                </span>
                            </li>

                            <li
                                className="menu-item mb-1.5 last:mb-0"
                                onClick={() =>
                                    router.push(`/profile/${user.id}`)
                                }
                            >
                                <span className="whitespace-nowrap text-stone-300 ">
                                    Trang Cá Nhân
                                </span>
                            </li>

                            {id === group.owner.id && (
                                <>
                                    <DialogWithModal
                                        buttonChildren={
                                            <li className="menu-item mb-1.5 last:mb-0">
                                                <span className="whitespace-nowrap text-stone-300">
                                                    Xoá khỏi nhóm
                                                </span>
                                            </li>
                                        }
                                        callbackAccept={() =>
                                            handleKickFriendFromGroup({
                                                groupId: group.id,
                                                ortherId: user.id,
                                            })
                                        }
                                        titleDialog="Xác nhận xoá thành viên ra khỏi nhóm?"
                                    />

                                    <DialogWithModal
                                        buttonChildren={
                                            <li className="menu-item mb-1.5 last:mb-0">
                                                <span className="whitespace-nowrap text-stone-300">
                                                    Trao quyền trưởng nhóm
                                                </span>
                                            </li>
                                        }
                                        callbackAccept={() =>
                                            handleTranferOwner({
                                                groupId: group.id,
                                                ortherId: user.id,
                                            })
                                        }
                                        titleDialog="Xác nhận trao quyền trưởng nhóm?"
                                    />
                                </>
                            )}
                        </ul>
                    </MenuContainer>
                </ButtonWithHandleClickOutside>
            )}
            <FriendItem
                user={user}
                friendsOnline={[]}
                className="peer-hover/button-menu:bg-darkHover"
            />
        </div>
    );
};

export default MemberGroupItem;
