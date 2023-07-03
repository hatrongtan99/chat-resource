import {
    BadRequestException,
    Injectable,
    MethodNotAllowedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friends, Users } from 'src/db/entities';
import { StatusFriend } from 'src/db/entities/Friends';
import { UserService } from 'src/users/users.service';
import { Brackets, In, Repository } from 'typeorm';

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(Friends)
        private friendRepository: Repository<Friends>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        private userService: UserService,
    ) {}

    async getFriends(id: number): Promise<Users[]> {
        const friends = await this.userRepository.query(
            `
                SELECT U.*, profile.id as profileId, profile.avatar, profile.banner, profile.about FROM users as U 
                LEFT JOIN profile ON U.profileId = profile.id
                WHERE U.id <> ?
                AND EXISTS (
                    SELECT * FROM relate_friends AS F
                    WHERE (
                       ( F.usersId_1 = ? AND U.id = F.usersId_2 ) OR (F.usersId_2 = ? AND U.id = usersId_1)
                    )
                );
            `,
            [id, id, id],
        );

        return friends.map((friend) => {
            const { profileId, avatar, banner, about, ...rest } = friend;
            return {
                ...rest,
                profile: {
                    id: profileId,
                    avatar,
                    banner,
                    about,
                },
            };
        });
    }

    getPending(id: number): Promise<Friends[]> {
        const status = StatusFriend.PENDING;
        return this.friendRepository.find({
            where: { receiver: { id }, status },
            relations: { sender: true, receiver: true },
        });
    }

    async createFriend(senderId: number, receiverId: number): Promise<Friends> {
        const existRelationShip = await this.getRelationById(
            senderId,
            receiverId,
            [
                StatusFriend.PENDING,
                StatusFriend.REJECTED,
                StatusFriend.ACCEPTED,
            ],
        );

        if (
            existRelationShip &&
            existRelationShip.status === StatusFriend.ACCEPTED
        ) {
            throw new BadRequestException('Already is friend');
        }
        const sender = await this.userService.findUser({
            id: senderId,
        });
        const receiver = await this.userService.findUser({
            id: receiverId,
        });
        if (!sender || !receiver) {
            throw new BadRequestException();
        }
        if (existRelationShip) {
            if (existRelationShip.status == StatusFriend.PENDING) {
                throw new BadRequestException('Friend request alredy send!');
            }
            if (existRelationShip.status == StatusFriend.REJECTED) {
                existRelationShip.status = StatusFriend.PENDING;
                existRelationShip.sender = sender;
                existRelationShip.receiver = receiver;
                return this.friendRepository.save(existRelationShip);
            }
        }
        const newRelationship = this.friendRepository.create({
            sender,
            receiver,
        });
        return this.friendRepository.save(newRelationship);
    }

    async cancelFriendRequest(senderId: number, receiverId: number) {
        const friendRequest = await this.getRelationById(senderId, receiverId, [
            StatusFriend.PENDING,
        ]);
        if (!friendRequest) {
            throw new BadRequestException('Friend request not found!');
        }
        friendRequest.status = StatusFriend.REJECTED;
        return this.friendRepository.save(friendRequest);
    }

    async unfriend(idUser: number, ortherIdUser: number) {
        const friend = await this.getRelationById(idUser, ortherIdUser, [
            StatusFriend.ACCEPTED,
        ]);
        if (!friend) {
            throw new MethodNotAllowedException("Is't Relationship!");
        }
        friend.status = StatusFriend.REJECTED;
        const user1 = friend.sender;
        const user2 = friend.receiver;
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
        const user2 = friendRequest.receiver;
        user1.friends = [user2];
        await this.userRepository.save(user1);
        friendRequest.status = StatusFriend.ACCEPTED;
        return this.friendRepository.save(friendRequest);
    }

    async getStatusFriend(
        userOneId: number,
        userTwoId: number,
    ): Promise<Friends | null> {
        const relation = await this.getRelationById(userOneId, userTwoId, [
            StatusFriend.ACCEPTED,
            StatusFriend.PENDING,
            StatusFriend.REJECTED,
        ]);

        if (!relation) return null;

        return relation;
    }

    getRelationById(
        userOneId: number,
        userTwoId: number,
        status: StatusFriend[],
    ): Promise<Friends> {
        if (userOneId === userTwoId) {
            throw new BadRequestException("Can't found realtion yourself!!");
        }

        return this.friendRepository
            .createQueryBuilder('friend')
            .where('friend.status IN (:...status)', { status })
            .leftJoinAndSelect('friend.sender', 'sender')
            .leftJoinAndSelect('friend.receiver', 'receiver')
            .andWhere(
                new Brackets((qb) => {
                    qb.where(
                        new Brackets((qb) => {
                            qb.where('sender.id = :id1', {
                                id1: userOneId,
                            }).andWhere('receiver.id = :id2', {
                                id2: userTwoId,
                            });
                        }),
                    ).orWhere(
                        new Brackets((qb) => {
                            qb.where('sender.id = :id2', {
                                id2: userTwoId,
                            }).andWhere('receiver.id = :id1', {
                                id1: userOneId,
                            });
                        }),
                    );
                }),
            )
            .leftJoinAndSelect('sender.friends', 'sender_friends')
            .leftJoinAndSelect('receiver.friends', 'receiver_friends')
            .getOne();
    }
}
