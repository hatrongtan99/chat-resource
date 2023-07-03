import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EventFriends, Routes } from 'src/utils/constant';
import { FriendsService } from './friends.service';
import { AuthUser, Public } from 'src/auth/decorators/public';
import { Users } from 'src/db/entities';
import {
    AcceptRequestFriendDto,
    CancelFriendRequestDto,
    CreateFriendRequestDto,
    SearchFriendsDto,
    UnfriendDto,
} from './dto';
import { PayloadEventFriendCreateRequest } from 'src/events/friends/types';
import { UserService } from '../users/users.service';

@Controller(Routes.FRIENDS)
export class FriendsController {
    constructor(
        private readonly friendService: FriendsService,
        private eventEmiter: EventEmitter2,
        private readonly userService: UserService,
    ) {}

    @Get()
    async handleGetFriends(@AuthUser() user: Users) {
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
        const payload = await this.friendService.createFriend(
            user.id,
            body.receicId,
        );
        // event;
        this.eventEmiter.emit(
            EventFriends.CREATE_FRIEND_REQUEST,
            payload as PayloadEventFriendCreateRequest,
        );
        return {
            success: true,
        };
    }

    @Post('cancel-request')
    async handleCancelRequest(
        @AuthUser() user: Users,
        @Body() body: CancelFriendRequestDto,
    ) {
        await this.friendService.cancelFriendRequest(user.id, body.ortherId);
        return {
            success: true,
        };
    }

    @Post('accept-request')
    async handleAcceptRequest(
        @AuthUser() user: Users,
        @Body() body: AcceptRequestFriendDto,
    ) {
        const payload = await this.friendService.acceptFriend(
            user.id,
            body.ortherId,
        );
        this.eventEmiter.emit(EventFriends.ACCEPT_FRIEND_REQUEST, payload);
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

    @Get('search')
    handleSearchFriends(
        @AuthUser() authUser: Users,
        @Query() searchFriendParams: SearchFriendsDto,
    ) {
        return this.userService.searchUser({
            username: searchFriendParams._q,
            exceptId: authUser.id,
        });
    }

    @Get(':id')
    async handleGetFriendProfile(
        @AuthUser() authUser: Users,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return {
            friend: await this.userService.findUser({ id }),
            status: await this.friendService.getStatusFriend(authUser.id, id),
        };
    }
}
