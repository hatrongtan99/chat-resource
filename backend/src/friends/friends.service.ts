import {
    BadRequestException,
    Injectable,
    MethodNotAllowedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friends, Users } from 'src/db/entities';
import { StatusFriend } from 'src/db/entities/Friends';
import { UserService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(Friends)
        private friendRepository: Repository<Friends>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        private userService: UserService,
    ) {}

    getFriends(id: number): Promise<Friends[]> {
        const status = StatusFriend.ACCEPTED;
        return this.friendRepository.find({
            where: [
                { sender: { id }, status },
                { reciecer: { id }, status },
            ],
            relations: {
                sender: true,
                reciecer: true,
            },
        });
    }

    getPending(id: number): Promise<Friends[]> {
        const status = StatusFriend.PENDING;
        return this.friendRepository.find({
            where: [
                { sender: { id }, status },
                { reciecer: { id }, status },
            ],
            relations: { sender: true, reciecer: true },
        });
    }

    async createFriend(senderId: number, reciecerId: number): Promise<Friends> {
        const isFriend = Boolean(await this.isFriend(senderId, reciecerId));
        if (isFriend) {
            throw new BadRequestException('Already is friend');
        }
        const sender = await this.userService.findUser({ id: senderId });
        const reciecer = await this.userService.findUser({ id: reciecerId });
        if (!sender || !reciecer) {
            throw new BadRequestException();
        }
        const exitRelationShip = await this.getRelationById(
            sender.id,
            reciecer.id,
            [StatusFriend.PENDING, StatusFriend.REJECTED],
        );
        if (exitRelationShip) {
            if (exitRelationShip.status == StatusFriend.PENDING) {
                throw new BadRequestException('Friend request alredy send!');
            }
            if (exitRelationShip.status == StatusFriend.REJECTED) {
                exitRelationShip.status = StatusFriend.PENDING;
                return this.friendRepository.save(exitRelationShip);
            }
        }
        const newRelationship = this.friendRepository.create({
            sender,
            reciecer,
        });
        return this.friendRepository.save(newRelationship);
    }

    async cancelFriendRequest(senderId: number, reciecerId: number) {
        const friendRequest = await this.getRelationById(senderId, reciecerId, [
            StatusFriend.PENDING,
        ]);
        if (!friendRequest) {
            throw new BadRequestException('Friend request not found!');
        }
        friendRequest.status = StatusFriend.REJECTED;
        return this.friendRepository.save(friendRequest);
    }

    async unfriend(idUser: number, ortherIdUser: number) {
        const friend = await this.isFriend(idUser, ortherIdUser);
        if (!friend) {
            throw new MethodNotAllowedException("Is't Relationship!");
        }
        friend.status = StatusFriend.REJECTED;
        const user1 = friend.sender;
        const user2 = friend.reciecer;
        user1.friends = user1.friends.filter((user) => user.id !== user2.id);
        user2.friends = user2.friends.filter((user) => user.id !== user1.id);
        await this.userRepository.save([user1, user2]);
        return this.friendRepository.save(friend);
    }

    async acceptFriend(idUser: number, ortherIdUser: number): Promise<Friends> {
        const friendRequest = await this.getRelationById(idUser, ortherIdUser, [
            StatusFriend.PENDING,
        ]);
        if (!friendRequest) {
            throw new MethodNotAllowedException('Friend request not found!');
        }
        const user1 = friendRequest.sender;
        const user2 = friendRequest.reciecer;
        user1.friends = [user2];
        user2.friends = [user1];
        await this.userRepository.save([user1, user2]);
        friendRequest.status = StatusFriend.ACCEPTED;
        return this.friendRepository.save(friendRequest);
    }

    isFriend(idUser: number, ortherIdUser: number): Promise<Friends> {
        const status = StatusFriend.ACCEPTED;
        return this.friendRepository.findOne({
            where: [
                {
                    sender: { id: idUser },
                    reciecer: { id: ortherIdUser },
                    status,
                },
                {
                    sender: { id: ortherIdUser },
                    reciecer: { id: idUser },
                    status,
                },
            ],
            relations: {
                sender: true,
                reciecer: true,
            },
        });
    }

    getRelationById(
        userOneId: number,
        userTwoId: number,
        status: StatusFriend[],
    ): Promise<Friends> {
        return this.friendRepository.findOne({
            where: [
                {
                    sender: { id: userOneId },
                    reciecer: { id: userTwoId },
                    status: In([...status]),
                },
                {
                    sender: { id: userTwoId },
                    reciecer: { id: userOneId },
                    status: In([...status]),
                },
            ],
            relations: {
                sender: true,
                reciecer: true,
            },
        });
    }
}
