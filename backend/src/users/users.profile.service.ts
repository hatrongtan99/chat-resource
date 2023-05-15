import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Users } from 'src/db/entities';
import { Repository } from 'typeorm';
import { UpdateProfileParams } from './type';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        @InjectRepository(Users) private userRepository: Repository<Users>,
    ) {}
    async createProfile() {
        const newProfile = this.profileRepository.create();
        return await this.profileRepository.save(newProfile);
    }

    async createOrUpdateProfile(user: Users, params: UpdateProfileParams) {
        if (!user.profile) {
            user.profile = await this.createProfile();
            return await this.updateProfile(user, params);
        }
        return await this.updateProfile(user, params);
    }

    updateProfile(user: Users, params: UpdateProfileParams) {
        if (params.about) {
            user.profile.about = params.about;
        }
        if (params.avatar) {
            user.profile.avatar = ' ';
        }
        if (params.banner) {
            user.profile.banner = ' ';
        }
        return this.userRepository.save(user);
    }
}
