"use client";
import { IoIosAddCircle } from "react-icons/io";
import { ChangeEvent, MouseEvent, useContext, useRef } from "react";
import { LIMIT_ATTACHMENTS } from "@/utils/constant";
import useToast from "@/hook/useToast";
import { AttachmentsContext } from "@/context/attachments/AttachmentsProvider";
import { typeFile } from "@/utils";

const AddAttachmentsButton = () => {
    const { addAttachment, attachments, clearAttachments } =
        useContext(AttachmentsContext);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const handleClickIcon = (e: MouseEvent) => {
        inputFileRef.current?.click();
    };
    const { error } = useToast();

    const hanldeOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;
        if (attachments.length) {
            clearAttachments();
        }

        if (files.length > LIMIT_ATTACHMENTS) {
            return error("Gửi tối đa 5 file!");
        }
        for (let i = 0; i < files.length; i++) {
            addAttachment({
                id: i,
                file: files[i],
                file_name: files[i].name,
                type: typeFile(files[i]),
            });
        }
        e.target.value = "";
    };

    return (
        <div onClick={handleClickIcon}>
            <IoIosAddCircle size={"1.5rem"} color="#3867d6" />
            <input
                className="hidden"
                type="file"
                multiple
                onChange={hanldeOnchange}
                ref={inputFileRef}
            />
        </div>
    );
};

export default AddAttachmentsButton;
