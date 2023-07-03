"use client";

import TopWithLable from "@/components/common/topWithLable/TopWithLable";
import GroupContainer from "@/components/group/GroupContainer";
import CreateNewGroupForm from "@/components/group/modal/CreateNewGroupForm";
import LeftResizeable from "@/components/leftResizeable";
import SearchConversations from "@/components/search/searchConversations/SearchConversations";
import { useState } from "react";

const GroupsPage = () => {
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
                {/* search group */}
                <SearchConversations />
                <GroupContainer />
            </LeftResizeable>
            <div className="grow bg-darkLight flex ">
                <p className="font-thin text-sm text-gray-400 m-auto">
                    Groups Message
                </p>
            </div>
            {openModal && (
                <CreateNewGroupForm handleClick={() => setOpenModal(false)} />
            )}
        </>
    );
};

export default GroupsPage;
