import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entities';
import {
    CreateUserParams,
    FindUserParams,
    OptionFindUser,
    SearchUserParams,
} from 'src/users/type';
import { Repository } from 'typeorm';
import { hashValue } from 'src/utils';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    findUser(params: FindUserParams, options?: OptionFindUser): Promise<Users> {
        let fieldSelecs: (keyof Users)[] = [
            'email',
            'fullname',
            'id',
            'profile',
            'created_at',
            'updated_at',
            'provider',
            'provider_id',
        ];
        if (options?.selectAll) {
            fieldSelecs = [...fieldSelecs, 'password'];
        }
        return this.usersRepository.findOne({
            where: { ...params },
            select: fieldSelecs,
            relations: ['profile'],
        });
    }

    searchUser(params: SearchUserParams): Promise<Users[]> {
        return this.usersRepository
            .createQueryBuilder('user')
            .where('user.fullname like :username', {
                username: `%${params.username}%`,
            })
            .andWhere('user.id != :id', { id: params.exceptId })
            .leftJoinAndSelect('user.profile', 'profile')
            .getMany();
    }

    async createUser(userParams: CreateUserParams): Promise<Users> {
        let { password, email } = userParams;
        const exitsUser = await this.findUser({ email });

        if (exitsUser) {
            throw new HttpException(
                'Tài khoản đã được đăng ký!',
                HttpStatus.CONFLICT,
            );
        }
        if (password) {
            const hashPass = await hashValue(password);
            password = hashPass;
        }

        const newUser = this.usersRepository.create({
            ...userParams,
            password,
        });

        return this.usersRepository.save(newUser);
    }

    async delete() {
        return this.usersRepository.delete({});
    }
}
