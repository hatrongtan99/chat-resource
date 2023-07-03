import { Message } from "./Message";
import { User } from "./User";

export interface Conversation {
    id: number;
    creator: User;
    recipter: User;
    messages: Message[];
    lastMessageSent: Message | null;
    create_at: Date;
}

export interface NewMessagePayload {
    message: Message;
    conversation: Conversation;
}

export interface DeleteMessagePayload {
    messageId: number;
    conversationId: number;
}
