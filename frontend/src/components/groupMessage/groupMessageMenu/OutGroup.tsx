"use client";

import { outGroupApi } from "@/api/group";
import DialogWithModal from "@/components/customs/dialog/DialogWithModal";
import { GroupContext } from "@/context/group/GroupProvider";
import { useAccesstoken } from "@/hook/useAuth";
import useToast from "@/hook/useToast";
import { Group } from "@/types/Group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const OutGroup = ({ groupId }: { groupId: number }) => {
    const { deleteGroup } = useContext(GroupContext);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { accessToken, id } = useAccesstoken();
    const { error: errorToast } = useToast();

    const { mutate: handleOutGroup } = useMutation(
        [`group-out-group-${groupId}`, { userId: id }],
        () => outGroupApi(accessToken!, groupId),
        {
            onError: (error: any) => {
                console.log(error);
                if (error.status === 406) {
                    errorToast("Bạn đang là trưởng nhóm!!!");
                }
            },
            onSuccess: ({ data }) => {
                if (data.success) {
                    const prevGroupsRes: any = queryClient.getQueryData([
                        "groups",
                        id,
                    ]);

                    if (prevGroupsRes && prevGroupsRes?.data?.groups) {
                        const groupdelete = prevGroupsRes?.data?.groups?.find(
                            (g: any) => g.id === groupId
                        );
                        deleteGroup(groupdelete);

                        const firstGroup = prevGroupsRes?.data?.groups?.filter(
                            (group: any) => group.id !== groupId
                        )?.[0];
                        queryClient.invalidateQueries(["groups", id]);
                        router.push(
                            firstGroup ? `/groups/${firstGroup.id}` : "/groups"
                        );
                    }
                }
            },
        }
    );

    return (
        <DialogWithModal
            buttonChildren={
                <li className="menu-item group">
                    <span className="whitespace-nowrap text-stone-300 group-hover:text-red-700">
                        Rời khỏi nhóm
                    </span>
                </li>
            }
            titleDialog="Xác nhận rời khỏi nhóm?"
            callbackAccept={handleOutGroup}
        />
    );
};

export default OutGroup;
