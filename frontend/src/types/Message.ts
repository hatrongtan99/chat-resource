import { User } from "./User";

export interface Message {
    id: number;
    content: string | null;
    author: User;
    attachments: Attachment[];
    create_at: Date;
    update_at: Date;
}

export interface Attachment {
    id: number;
    public_id: string;
    url: string;
    type: TypeFile;
    file_name: string;
}

export interface GetMessagesParams {
    token: string;
    conversationId: number;
    limit?: number;
    offset?: number;
}

export enum TypeFile {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    ORTHER = "ORTHER",
}

// group
export interface GroupAttachment {
    id: number;
    public_id: string;
    url: string;
    type: TypeFile;
    file_name: string;
}

export interface GroupMessage {
    id: number;
    content: string | null;
    author: User;
    attachments: GroupAttachment[];
    create_at: Date;
    update_at: Date;
}
