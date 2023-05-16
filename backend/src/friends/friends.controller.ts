import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EventFriends, Routes } from 'src/utils/contant';
import { FriendsService } from './friends.service';
import { AuthUser } from 'src/auth/decorators/public';
import { Users } from 'src/db/entities';
import {
    CancelFriendRequestDto,
    CreateFriendRequestDto,
    UnfriendDto,
} from './dto';
import { PayloadEventFriendCreateRequest } from 'src/events/types';

@Controller(Routes.FRIENDS)
export class FriendsController {
    constructor(
        private readonly friendService: FriendsService,
        private eventEmiter: EventEmitter2,
    ) {}

    @Get()
    async HandleGetFriends(@AuthUser() user: Users) {
        return {
            success: true,
            friends: await this.friendService.getFriends(user.id),
        };
    }

    @Get('pending')
    async handleGetRequestPending(@AuthUser() user: Users) {
        return {
            success: true,
            friends: await this.friendService.getPending(user.id),
        };
    }

    @Post('create-request')
    async handleCreateFriendRequest(
        @AuthUser() user: Users,
        @Body() body: CreateFriendRequestDto,
    ) {
        const friendRequest = await this.friendService.createFriend(
            user.id,
            body.receicId,
        );
        // event
        this.eventEmiter.emit(EventFriends.CREATE_FRIEND_REQUEST, {
            senderId: user.id,
            receierId: body.receicId,
        } as PayloadEventFriendCreateRequest);
        return {
            success: true,
            data: friendRequest,
        };
    }

    @Post('cancel-request')
    async handleCancelRequest(
        @AuthUser() user: Users,
        @Body() body: CancelFriendRequestDto,
    ) {
        await this.friendService.cancelFriendRequest(user.id, body.receicId);
        return {
            success: true,
        };
    }

    @Post('unfriend')
    async handleUnfriend(@AuthUser() user: Users, @Body() body: UnfriendDto) {
        await this.friendService.unfriend(user.id, body.ortherId);
        return {
            success: true,
        };
    }
}
