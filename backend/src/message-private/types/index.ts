import { Conversation, Users } from 'src/db/entities';
import { TypeFile } from 'src/db/entities/MessageAttachment';

export type Attachment = {
    file: Express.Multer.File;
    file_name: string;
    type: TypeFile;
};

export type InfoFile = {
    file_name: string;
    type: TypeFile;
};

export type CreateNewMessagePrivateMessageParams = {
    content?: string;
    authorId: number;
    conversationId: number;
    attachments?: Attachment[];
};

export type GetListMessagesParams = {
    conversationId: number;
    offset?: number;
    limit?: number;
};

export type DeleteMessageParams = {
    messageId: number;
    conversationId: number;
    user: Users;
};

export type DeleteLastMessageParams = {
    conversation: Conversation;
    messageId: number;
};
