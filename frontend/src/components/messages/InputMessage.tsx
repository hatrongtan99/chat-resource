"use client";
import dynamic from "next/dynamic";
import { BsEmojiSmileFill } from "react-icons/bs";

const Picker = dynamic(
    () => {
        return import("emoji-picker-react");
    },
    { ssr: false }
);

import { AiFillLike } from "react-icons/ai";
import {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    SetStateAction,
    memo,
    useContext,
    useEffect,
    useRef,
} from "react";
import AttachmentsContainer from "../attachments/AttachmentsContainer";
import AddAttachmentsButton from "./AddAttachmentsButton";
import { AttachmentsContext } from "@/context/attachments/AttachmentsProvider";

interface InputMessageProps {
    sendStatusTyping: () => void;
    sendMessage: () => Promise<void>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
}

const InputMessage = ({
    sendStatusTyping,
    sendMessage,
    content,
    setContent,
}: InputMessageProps) => {
    const refInput = useRef<HTMLInputElement>(null);
    const { attachments, clearAttachments, attachmentDisplay } =
        useContext(AttachmentsContext);

    // auto focus input
    useEffect(() => {
        refInput.current?.focus();
    }, [refInput]);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        sendStatusTyping();
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    return (
        <form className="h-auto w-full flex justify-center items-end gap-1 my-2 px-4">
            <div className="-ml-1 p-1 rounded-full hover:bg-darkLight inline-block cursor-pointer mb-1">
                <AddAttachmentsButton />
            </div>
            <div className="grow bg-darkLight pl-3 pr-2 py-1.5 rounded-2xl">
                {attachments.length !== 0 && (
                    <AttachmentsContainer
                        attachments={attachmentDisplay}
                        handleClear={clearAttachments}
                    />
                )}
                <div className="w-full min-w-[200px] flex items-center ">
                    <input
                        type="text"
                        className="w-full bg-inherit border-none outline-none text-sm"
                        placeholder="type a messege..."
                        onKeyDown={onKeyDown}
                        value={content}
                        onChange={onChange}
                        ref={refInput}
                    />
                    {/* <div>
                    {" "}
                    <Picker />
                </div> */}
                    <div className="cursor-pointer inline-block ">
                        <BsEmojiSmileFill size="1.5rem" color={"#3867d6"} />
                    </div>
                </div>
            </div>
            <div className="p-1 rounded-full hover:bg-darkLight inline-block cursor-pointer mb-1">
                <AiFillLike size="1.5rem" color="#3867d6" />
            </div>
        </form>
    );
};

export default memo(InputMessage);
