import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from 'src/db/entities';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Friends]), UsersModule],
    providers: [FriendsService],
    exports: [FriendsService],
    controllers: [FriendsController],
})
export class FriendsModule {}
