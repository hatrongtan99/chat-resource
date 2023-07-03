import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/db/entities';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UsersModule } from 'src/users/users.module';
import { FriendsModule } from 'src/friends/friends.module';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { UploadFileModule } from 'src/upload-file/upload-file.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Group]),
        UsersModule,
        FriendsModule,
        UploadFileModule,
    ],
    exports: [GroupService],
    providers: [GroupService],
    controllers: [GroupController],
})
export class GroupModule {}
