"use client";

import { RiVideoUploadFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";

const TopWithLable = ({
    lable,
    addButton,
    handleAddButton,
}: {
    lable: string;
    addButton?: boolean;
    handleAddButton?: () => void;
}) => {
    return (
        <div className="h-auto">
            <div className="flex justify-start items-center mt-4 mx-2 mb-1">
                <h2>{lable}</h2>
                {addButton && (
                    <div className="ml-2 flex items-center group">
                        <button
                            onClick={() => handleAddButton && handleAddButton()}
                            className="p-1.5 hover:bg-darkHover rounded-full"
                        >
                            <IoIosAddCircle
                                size="1.6rem"
                                className="text-primary group-hover:text-primaryLight active:scale-95"
                            />
                        </button>
                    </div>
                )}
                <div className="flex items-center ml-auto">
                    <div className="p-2 rounded-full hover:bg-darkLight inline-block cursor-pointer">
                        <RiVideoUploadFill size={"1.25rem"} />
                    </div>
                    <div className="p-2 rounded-full hover:bg-darkLight inline-block cursor-pointer">
                        <BiEdit size={"1.25rem"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopWithLable;
