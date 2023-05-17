import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Users } from 'src/db/entities';
import { Repository } from 'typeorm';
import { UpdateProfileParams } from './type';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { UploadFileResult } from 'src/upload-file/types';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private readonly uploadFileService: UploadFileService,
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

    async updateProfile(user: Users, params: UpdateProfileParams) {
        if (params.about) {
            user.profile.about = params.about;
        }
        if (params.avatar) {
            const { public_id, url }: UploadFileResult =
                await this.uploadFileService.uploadSingleFile({
                    file: params.avatar,
                });
            user.profile.avatar = url;
        }
        if (params.banner) {
            const { public_id, url }: UploadFileResult =
                await this.uploadFileService.uploadSingleFile({
                    file: params.banner,
                });
            user.profile.banner = url;
        }
        return this.userRepository.save(user);
    }
}
