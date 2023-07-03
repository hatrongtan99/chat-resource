"use client";

import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import GroupContainer from "@/components/group/GroupContainer";
import CreateNewGroupForm from "@/components/group/modal/CreateNewGroupForm";
import GroupMessageWrapper from "@/components/groupMessage/GroupMessageWrapper";
import LeftResizeable from "@/components/leftResizeable";
import SearchConversations from "@/components/search/searchConversations/SearchConversations";
import React, { useState } from "react";

const page = ({ params: { groupId } }: { params: { groupId: string } }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleClickAddButton = () => {
        setOpenModal(true);
    };

    return (
        <>
            <LeftResizeable>
                <TopWithLable
                    lable="Groups"
                    addButton
                    handleAddButton={handleClickAddButton}
                />
                <SearchConversations />
                <GroupContainer />
            </LeftResizeable>

            <GroupMessageWrapper groupId={parseInt(groupId)} />

            {openModal && (
                <CreateNewGroupForm handleClick={() => setOpenModal(false)} />
            )}
        </>
    );
};

export default page;
