"use client";
import ButtonWithHandleClickOutside from "@/components/common/buttonWithHandleClickOutside/ButtonWithHandleClickOutside";
import { MdGroups3 } from "react-icons/md";
import ListMemberGroup from "./ListMemberGroup";
import ButtonMenu from "@/components/button/ButtonMenu";
import MenuContainer from "@/components/common/menu/MenuContainer";
import AddMemberGroup from "./AddMemberGroup";
import { IoPersonAddSharp } from "react-icons/io5";
import OutGroup from "./OutGroup";

interface GroupMessageMenuButtonProps {
    SIZE_ICON: string;
    groupId: number;
}

const GroupMessageMenuButton = ({
    SIZE_ICON,
    groupId,
}: GroupMessageMenuButtonProps) => {
    return (
        <>
            <ButtonWithHandleClickOutside
                buttonChildren={<ButtonMenu SIZE_ICON={SIZE_ICON} />}
            >
                {/* menu body */}
                <MenuContainer>
                    <ul className="flex flex-col">
                        <ButtonWithHandleClickOutside
                            buttonChildren={
                                <li className="menu-item">
                                    <MdGroups3 size={SIZE_ICON} />
                                    <span className="ml-2 whitespace-nowrap text-stone-300">
                                        Thành viên
                                    </span>
                                </li>
                            }
                            modal={true}
                        >
                            <ListMemberGroup groupId={groupId} />
                        </ButtonWithHandleClickOutside>

                        <ButtonWithHandleClickOutside
                            buttonChildren={
                                <li className="menu-item">
                                    <IoPersonAddSharp size={SIZE_ICON} />
                                    <span className="ml-2 whitespace-nowrap text-stone-300">
                                        Thêm thành viên
                                    </span>
                                </li>
                            }
                            modal={true}
                        >
                            <AddMemberGroup groupId={groupId} />
                        </ButtonWithHandleClickOutside>

                        {/* out group */}
                        <OutGroup groupId={groupId} />
                    </ul>
                </MenuContainer>
            </ButtonWithHandleClickOutside>
        </>
    );
};

export default GroupMessageMenuButton;
