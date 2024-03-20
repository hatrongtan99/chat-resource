"use client";

import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import GroupContainer from "@/components/group/GroupContainer";
import CreateNewGroupForm from "@/components/group/modal/CreateNewGroupForm";
import LeftResizeable from "@/components/leftResizeable";
import SearchConversations from "@/components/search/searchConversations/SearchConversations";
import React, { ReactNode, useState } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleClickAddButton = () => {
        setOpenModal(true);
    };
    return (
        <div className="h-full flex">
            <LeftResizeable>
                <TopWithLable
                    lable="Groups"
                    addButton
                    handleAddButton={handleClickAddButton}
                />
                {/* search group */}
                <SearchConversations />
                <GroupContainer />
            </LeftResizeable>
            {children}
            {openModal && (
                <CreateNewGroupForm handleClick={() => setOpenModal(false)} />
            )}
        </div>
    );
};

export default layout;
