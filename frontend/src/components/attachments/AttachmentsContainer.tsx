import React from "react";
import AttachmentItem from "./AttachmentItem";
import { AttachmentDisplay } from "@/context/attachments/AttachmentsProvider";
import { MdClear } from "react-icons/md";

const AttachmentsContainer = ({
    attachments,
    handleClear,
}: {
    attachments: AttachmentDisplay[];
    handleClear: () => void;
}) => {
    return (
        <div className="flex h-auto m-2 gap-2 relative">
            <div
                onClick={handleClear}
                className="absolute -top-0.5 -right-0.5 p-1 rounded-full hover:bg-darkHover cursor-pointer"
            >
                <MdClear size="1rem" />
            </div>
            {attachments.map((a) => {
                return <AttachmentItem attachment={a} key={a.id} />;
            })}
        </div>
    );
};

export default AttachmentsContainer;
