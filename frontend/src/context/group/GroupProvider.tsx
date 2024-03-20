"use client";

import { createNewGroupApi, getGroupsApi } from "@/api/group";
import { useAccesstoken } from "@/hook/useAuth";
import useToast from "@/hook/useToast";
import { CreateNewGroupParams, Group } from "@/types/Group";
import { useQuery } from "@tanstack/react-query";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";

interface GroupContextProps {
    groupId: number | null;
    setGroupId: Dispatch<SetStateAction<number | null>>;
    groups: Group[];
    setGroups: Dispatch<SetStateAction<Group[]>>;
    status: "loading" | "error" | "success";
    handleCreateNewGroup: (
        body: CreateNewGroupParams,
        cb: () => void
    ) => Promise<void>;
    updateGroups: (group: Group) => void;
    deleteGroup: (group: Group) => void;
    getGroup: (groupId: number) => Group;
}

export const GroupContext = createContext({} as GroupContextProps);

const GroupProvider = ({ children }: { children: ReactNode }) => {
    const [groupId, setGroupId] = useState<number | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const { accessToken, id } = useAccesstoken();
    const { error: errorrToast } = useToast();

    const { data, status } = useQuery(
        ["groups", id],
        () => getGroupsApi(accessToken!),
        {
            enabled: !!accessToken,
        }
    );

    useEffect(() => {
        if (status === "success") {
            setGroups(data.data.groups);
        }
    }, [status]);

    const handleCreateNewGroup = useCallback(
        async (
            { title, users, avatar }: CreateNewGroupParams,
            cb: () => void
        ) => {
            try {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("users", JSON.stringify(users));
                formData.append("avatar", avatar);
                cb();
                await createNewGroupApi(accessToken!, formData);
            } catch (error: any) {
                console.log(typeof error);
                errorrToast(`Gặp lỗi khi tạo nhóm ${title}`);
            }
        },
        [accessToken]
    );

    const updateGroups = (group: Group) => {
        setGroups((prev) => {
            const newGroups = prev.filter((g) => g.id !== group.id);
            return [group, ...newGroups];
        });
    };

    const deleteGroup = (group: Group) => {
        setGroups((prev) => {
            return prev.filter((g) => g.id !== group.id);
        });
    };

    const getGroup = (groupId: number) => {
        return groups.find((g) => g.id === groupId)!;
    };

    return (
        <GroupContext.Provider
            value={{
                groups,
                setGroups,
                status,
                handleCreateNewGroup,
                updateGroups,
                deleteGroup,
                getGroup,
                groupId,
                setGroupId,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};

export default GroupProvider;
