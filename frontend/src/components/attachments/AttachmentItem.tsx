"use client";

import {
    AttachmentDisplay,
    AttachmentsContext,
} from "@/context/attachments/AttachmentsProvider";
import { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import Image from "next/image";
import { GoFileDirectory } from "react-icons/go";
import { TypeFile } from "@/types/Message";
const AttachmentItem = ({ attachment }: { attachment: AttachmentDisplay }) => {
    const { removeAttachment } = useContext(AttachmentsContext);

    return (
        <div className="rounded-md overflow-hidden bg-darkHover h-[100px] w-[100px] relative ">
            <div
                className="absolute right-0.5 top-0.5 cursor-pointer  active:scale-90 z-20"
                onClick={() => removeAttachment(attachment.id)}
            >
                <TiDelete size="1rem" />
            </div>
            {attachment.type === TypeFile.IMAGE && (
                <div className="w-full h-full relative  ">
                    <Image src={attachment.url} alt="file" fill />
                </div>
            )}
            {attachment.type === TypeFile.VIDEO && (
                <div className="w-full h-full">
                    <video controls>
                        <source type="video/mp4" src={attachment.url}></source>
                    </video>
                </div>
            )}

            {attachment.type === TypeFile.ORTHER && (
                <div className="w-full h-full flex flex-col text-center">
                    <GoFileDirectory className="w-full h-full text-stone-600" />
                    <p className="text-stone-200 font-medium text-sm">
                        {attachment.file_name}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AttachmentItem;
