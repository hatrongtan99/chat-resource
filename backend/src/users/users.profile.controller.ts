import {
    Body,
    Controller,
    Patch,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/auth/decorators/public';
import { Users } from 'src/db/entities';
import { Routes } from 'src/utils/constant';
import { UserProfileService } from './users.profile.service';
import { UpdateProfileParams } from './type';
import { AboutItem } from './dto';
import { ValidationAboutProfile } from './pipe/validationAboutProfile';

type UserUpdateFiles = {
    avatar?: Express.Multer.File[];
    banner?: Express.Multer.File[];
};

@Controller(Routes.PROFILE)
export class UserProfileController {
    constructor(private readonly userProfileSevice: UserProfileService) {}

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
        @Body('about', new ValidationAboutProfile()) about: AboutItem[] | null,
    ) {
        const params: UpdateProfileParams = {
            avatar: uploadFileUser?.avatar?.[0],
            banner: uploadFileUser?.banner?.[0],
            about: about,
        };
        return this.userProfileSevice.createOrUpdateProfile(user, params);
    }
}
