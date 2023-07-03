import { TypeFile } from 'src/db/entities/GroupMessageAttachments';

export interface CreateNewGroupMessage {
    authorId: number;
    groupId: number;
    attachments?: {
        file: Express.Multer.File;
        file_name: string;
        type: TypeFile;
    }[];
    content?: string;
}

export interface GetGroupMessagesParams {
    groupId: number;
    offset?: number;
    limit?: number;
}
