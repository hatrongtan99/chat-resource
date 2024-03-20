import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { AuthUser, Public } from 'src/auth/decorators/public';
import { Users } from 'src/db/entities';
import { EventGroup, Routes } from 'src/utils/constant';
import {
    AddFriendToGroupDTO,
    CreateNewGroupDTO,
    GroupTranferOwnerDTO,
    KickOutGroupDTO,
    Member,
} from './dto';
import { GroupService } from './group.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
    PayloadEventGroupAddNewFriend,
    PayloadEventGroupKickFriend,
    PayloadEventOutFromGroup,
    PayloadEventTranferOwner,
} from 'src/events/group/type';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationMember } from './pipe/validationMember';

@Controller(Routes.GROUP)
export class GroupController {
    constructor(
        private groupService: GroupService,
        private eventEmitter: EventEmitter2,
    ) {}
    // get groups
    @Get()
    async handleGetGroups(@AuthUser() authUser: Users) {
        const groups = await this.groupService.getGroups({
            userId: authUser.id,
        });
        return { success: true, groups };
    }

    // create new Group
    @UseInterceptors(FileInterceptor('avatar'))
    @Post()
    async handleCreateNewGroup(
        @AuthUser() authUser: Users,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /[\/.](gif|jpg|jpeg|tiff|png)$/i,
                })
                .build({
                    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
                }),
        )
        avatar: Express.Multer.File,
        @Body('users', new ValidationMember()) users: Member[],
        @Body() { title }: CreateNewGroupDTO,
    ) {
        const group = await this.groupService.createNewGroup({
            creator: authUser,
            users: users,
            title: title,
            avatar,
        });

        this.eventEmitter.emit(EventGroup.CREATE_NEW_GROUP, { group });

        return { success: true };
    }

    @Post('add-friend')
    async handleAddfriendToGroup(
        @AuthUser() authUser: Users,
        @Body() { groupId, usersIdList }: AddFriendToGroupDTO,
    ) {
        const response = await this.groupService.addFriendToGroup({
            userId: authUser.id,
            usersIdList,
            groupId,
        });

        this.eventEmitter.emit(EventGroup.ADD_FRIEND_TO_GROUP, {
            usersIdList: response.usersIdList,
            group: response.group,
            inviter: authUser,
        } as PayloadEventGroupAddNewFriend);
        return { success: true };
    }

    @Post('kick')
    async handleKickFriend(
        @AuthUser() authUser: Users,
        @Body() { ortherId, groupId }: KickOutGroupDTO,
    ) {
        const group = await this.groupService.kickUser({
            userId: authUser.id,
            ortherId,
            groupId,
        });

        this.eventEmitter.emit(EventGroup.KICK_OUT_FRIEND_FROM_GROUP, {
            ortherId,
            group,
        } as PayloadEventGroupKickFriend);

        return { success: true };
    }

    @Post(':groupId/out-group')
    async handleOutGroup(
        @AuthUser() authUser: Users,
        @Param('groupId', ParseIntPipe) groupId: number,
    ) {
        const group = await this.groupService.outGroup({
            userId: authUser.id,
            groupId,
        });

        this.eventEmitter.emit(EventGroup.OUT_FROM_GROUP, {
            group,
        } as PayloadEventOutFromGroup);
        return { success: true };
    }

    @Post(':groupId/owner')
    async handleTranferOwner(
        @AuthUser() authUser: Users,
        @Param('groupId', ParseIntPipe) groupId: number,
        @Body() { ortherId }: GroupTranferOwnerDTO,
    ) {
        const group = await this.groupService.tranferOwner({
            userId: authUser.id,
            groupId,
            ortherId,
        });
        this.eventEmitter.emit(EventGroup.TRANFER_OWNER, {
            group,
        } as PayloadEventTranferOwner);

        return {
            success: true,
        };
    }
}
