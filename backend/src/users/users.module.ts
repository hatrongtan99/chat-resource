import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile, Users } from 'src/db/entities';
import { UsersController } from './users.controller';
import { UserProfileService } from './users.profile.service';
import { UserProfileController } from './users.profile.controller';
import { UploadFileModule } from 'src/upload-file/upload-file.module';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Profile]), UploadFileModule],
    providers: [UsersService, UserProfileService],
    exports: [UsersService, UserProfileService],
    controllers: [UsersController, UserProfileController],
})
export class UsersModule {}
