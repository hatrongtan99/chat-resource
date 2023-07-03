"use client";

import { TypeFile } from "@/types/Message";
import React, { useState, createContext, useEffect, ReactNode } from "react";

export type Attachment = {
    id: number;
    file: File;
    file_name: string;
    type: TypeFile;
};

export type AttachmentDisplay = {
    id: number;
    url: string;
    file_name: string;
    type: TypeFile;
};

interface AttachmentsProps {
    attachments: Attachment[];
    addAttachment: (attachment: Attachment) => void;
    clearAttachments: () => void;
    removeAttachment: (attachmentId: number) => void;
    attachmentDisplay: AttachmentDisplay[];
}
export const AttachmentsContext = createContext({} as AttachmentsProps);

const AttachmentsProvider = ({ children }: { children: ReactNode }) => {
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [attachmentDisplay, setAttachmentsDisplay] = useState<
        AttachmentDisplay[]
    >([]);

    const addAttachment = (attachment: Attachment) => {
        setAttachments((prev) => {
            prev.push(attachment);
            return prev;
        });
        setAttachmentsDisplay((prev) => {
            prev.push({
                ...attachment,
                id: attachment.id,
                url: URL.createObjectURL(attachment.file),
            });
            return prev;
        });
    };

    const clearAttachments = () => {
        setAttachments([]);
        setAttachmentsDisplay([]);
    };

    const removeAttachment = (attachmentId: number) => {
        setAttachments((prev) => {
            return [...prev.filter((att) => att.id !== attachmentId)];
        });
        setAttachmentsDisplay((prev) => [
            ...prev.filter((att) => att.id !== attachmentId),
        ]);
    };

    useEffect(() => {
        return () => {
            setAttachments([]);
            setAttachmentsDisplay([]);
        };
    }, []);

    return (
        <AttachmentsContext.Provider
            value={{
                attachments,
                addAttachment,
                clearAttachments,
                removeAttachment,
                attachmentDisplay,
            }}
        >
            {children}
        </AttachmentsContext.Provider>
    );
};

export default AttachmentsProvider;
