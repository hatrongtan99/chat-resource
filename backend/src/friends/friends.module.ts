import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends, Users } from 'src/db/entities';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Friends, Users]), UsersModule],
    providers: [FriendsService],
    exports: [FriendsService],
    controllers: [FriendsController],
})
export class FriendsModule {}
