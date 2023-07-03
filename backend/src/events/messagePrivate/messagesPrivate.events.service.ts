import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventMessagePrivate } from 'src/utils/constant';
import {
    PayloadEventMessagePrivateCreateNewMessage,
    PayloadEventMessagePrivateDeleteMessage,
} from './types';
import { SocketClientManager } from 'src/gateway/socketClientManager';
import { GatewayMessagePrivate } from 'src/utils/constant';
import { ConversationService } from 'src/conversations/conversations.service';

@Injectable()
export class MessagePrivateEventsService {
    constructor(
        private readonly socketClientManager: SocketClientManager,
        private readonly conversationSevice: ConversationService,
    ) {}

    @OnEvent(EventMessagePrivate.CREATE_NEW_MESSAGE)
    onNewMessagePrivate(payload: PayloadEventMessagePrivateCreateNewMessage) {
        const { message, conversation } = payload;
        const { creator, recipter } = conversation;
        const socketCreator = this.socketClientManager.getSocketClient(
            creator.id,
        );
        const socketRecipter = this.socketClientManager.getSocketClient(
            recipter.id,
        );
        socketCreator &&
            socketCreator.emit(
                GatewayMessagePrivate.MESSAGE_PRIVATE_ON_MESSAGE,
                payload,
            );

        socketRecipter &&
            socketRecipter.emit(
                GatewayMessagePrivate.MESSAGE_PRIVATE_ON_MESSAGE,
                payload,
            );
    }

    @OnEvent(EventMessagePrivate.DELETE_MESSAGE)
    async onDeleteMessage(payload: PayloadEventMessagePrivateDeleteMessage) {
        const { messageId, conversationId } = payload;
        const conversation = await this.conversationSevice.getConversationById(
            conversationId,
        );

        const { creator, recipter } = conversation;
        this.socketClientManager
            .getSocketClient(creator.id)
            ?.emit(GatewayMessagePrivate.MESSAGE_PRIVATE_ON_DELETE, payload);
        this.socketClientManager
            .getSocketClient(recipter.id)
            ?.emit(GatewayMessagePrivate.MESSAGE_PRIVATE_ON_DELETE, payload);
    }
}
