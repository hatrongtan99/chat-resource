import {
    Body,
    Controller,
    Inject,
    Patch,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import {
    FileFieldsInterceptor,
    FileInterceptor,
} from '@nestjs/platform-express';
import { AuthUser, Public } from 'src/auth/decorators/public';
import { Profile, Users } from 'src/db/entities';
import { Routes } from 'src/utils/constant';
import { UserProfileService } from './users.profile.service';
import { UpdateProfileParams } from './type';
import { ProfileUpdateDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { v2 } from 'cloudinary';
import { UploadFileService } from 'src/upload-file/upload-file.service';

type UserUpdateFiles = {
    about?: string;
    avatar?: Express.Multer.File[];
    banner?: Express.Multer.File[];
};

@Controller(Routes.PROFILE)
export class UserProfileController {
    constructor(
        private readonly userProfileSevice: UserProfileService,
        private readonly uploadFileService: UploadFileService,
    ) {}

    @Patch()
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: 'avatar',
                maxCount: 1,
            },
            {
                name: 'banner',
                maxCount: 1,
            },
        ]),
    )
    async updateProfileUser(
        @AuthUser() user: Users,
        @UploadedFiles() uploadFileUser: UserUpdateFiles,
        @Body() profileUpdate: ProfileUpdateDTO,
    ) {
        const params: UpdateProfileParams = {
            avatar: uploadFileUser?.avatar?.[0],
            banner: uploadFileUser?.banner?.[0],
            about: profileUpdate.about,
        };
        return this.userProfileSevice.createOrUpdateProfile(user, params);
    }
}
