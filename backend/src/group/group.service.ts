import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { Group, Users } from 'src/db/entities';
import { UserService } from 'src/users/users.service';
import {
    AddFriendToGroupParams,
    CreateNewGroupParams,
    GetGroupsParams,
    IsInGroupParams,
    KickOutGroupParams,
    OutGroupParams,
    tranferOwnerParams,
} from './type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadFileService } from 'src/upload-file/upload-file.service';

@Injectable()
export class GroupService {
    constructor(
        private userService: UserService,
        @InjectRepository(Group) private groupRepository: Repository<Group>,
        private uploadFileService: UploadFileService,
    ) {}

    async createNewGroup({
        creator,
        users,
        title,
        avatar,
    }: CreateNewGroupParams): Promise<Group> {
        const promiseListUsers = users.map((user) =>
            this.userService.findUser({ id: user.id }),
        );

        const usersInGroup = (await Promise.all(promiseListUsers)).filter(
            (user) => user,
        );
        usersInGroup.push(creator);

        const { url, public_id } =
            await this.uploadFileService.uploadSingleFile({
                file: avatar,
            });

        const newGroup = this.groupRepository.create({
            creator,
            owner: creator,
            users: usersInGroup,
            title,
            avatar: url,
        });
        return this.groupRepository.save(newGroup);
    }

    getGroups({ userId }: GetGroupsParams): Promise<Group[] | any> {
        return this.groupRepository
            .createQueryBuilder('group')
            .leftJoinAndSelect('group.users', 'user')
            .where('user.id = :userId', { userId })
            .leftJoinAndSelect('group.owner', 'owner')
            .leftJoinAndSelect('owner.profile', 'ownerProfile')
            .leftJoinAndSelect('group.lastMessageSent', 'lastMessageSent')
            .leftJoinAndSelect('group.users', 'users')
            .leftJoinAndSelect('users.profile', 'profile')
            .addOrderBy('group.update_at', 'DESC')
            .getMany();
    }

    async addFriendToGroup({
        userId,
        usersIdList,
        groupId,
    }: AddFriendToGroupParams): Promise<{
        usersIdList: { id: number }[];
        group: Group;
    }> {
        const group = await this.getGroupById(groupId);
        if (!group) {
            throw new NotFoundException('Group not found!!!');
        }
        if (!group.users.find((user) => user.id === userId)) {
            throw new NotAcceptableException('You not in group!!!');
        }
        const usersPromise = usersIdList.map((user) =>
            this.userService.findUser({ id: user.id }),
        );

        const usersObj = (await Promise.all(usersPromise)).filter(
            (user) => user,
        );
        const newUsersId: { id: number }[] = [];

        usersObj.forEach((user) => {
            const existInGroup = group.users.find((u) => u.id === user.id);
            if (!existInGroup) {
                group.users.push(user);
                newUsersId.push({ id: user.id });
            }
        });
        return {
            usersIdList,
            group: await this.groupRepository.save(group),
        };
    }

    async outGroup({ userId, groupId }: OutGroupParams): Promise<Group> {
        const group = await this.getGroupById(groupId);
        if (!group) {
            throw new NotFoundException('Group not found!!!');
        }
        if (userId === group.owner.id) {
            throw new NotAcceptableException(
                'You must tranfer owner group before out group!!!',
            );
        }
        group.users = group.users.filter((user) => user.id !== userId);
        return this.groupRepository.save(group);
    }

    async kickUser({
        userId,
        ortherId,
        groupId,
    }: KickOutGroupParams): Promise<Group> {
        const group = await this.getGroupById(groupId);
        if (!group) {
            throw new NotFoundException('Group not found!!!');
        }
        const owner = group.owner;
        if (userId !== owner.id) {
            throw new ForbiddenException('You insufficient permissions!!');
        }
        group.users = group.users.filter((user) => user.id !== ortherId);
        return this.groupRepository.save(group);
    }

    async tranferOwner({
        userId,
        ortherId,
        groupId,
    }: tranferOwnerParams): Promise<Group> {
        const group = await this.getGroupById(groupId);
        if (userId !== group.owner.id) {
            throw new NotAcceptableException(
                'Insufficient Permission!!, you not is group owner',
            );
        }
        if (ortherId === group.owner.id) {
            throw new BadRequestException("Can't tranfer owner to youself!!!");
        }
        const newOwner = await this.userService.findUser({ id: ortherId });
        group.owner = newOwner;
        return this.groupRepository.save(group);
    }

    getGroupById(id: number): Promise<Group> {
        return this.groupRepository
            .createQueryBuilder('group')
            .where('group.id = :id', { id })
            .leftJoinAndSelect('group.users', 'user')
            .leftJoinAndSelect('user.profile', 'profile')
            .leftJoinAndSelect('group.lastMessageSent', 'lastMessageSent')
            .leftJoinAndSelect('group.owner', 'owner')
            .getOne();
    }

    saveGroup(group: Group): Promise<Group> {
        return this.groupRepository.save(group);
    }
}
