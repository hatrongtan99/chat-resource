import { Conversation, Message } from 'src/db/entities';

export interface NewMessagePayload {
    message: Message;
    conversation: Conversation;
}

export interface MessageTypingPayload {
    conversation: Conversation;
}

export interface ClientJoinConversationPayload extends MessageTypingPayload {}
