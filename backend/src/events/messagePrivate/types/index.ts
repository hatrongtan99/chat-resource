import { Conversation, Message } from 'src/db/entities';

export type PayloadEventMessagePrivateCreateNewMessage = {
    conversation: Conversation;
    message: Message;
};

export type PayloadEventMessagePrivateDeleteMessage = {
    conversationId: number;
    messageId: number;
};
