import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GatewayModule } from './gateway/gateways.module';
import { MulterModule } from '@nestjs/platform-express';
import { MessagePrivateModule } from './message-private/message-private.module';
import { FriendsModule } from './friends/friends.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './events/events.module';
import { ConversationsModule } from './conversations/conversations.module';
import { GroupMessageModule } from './groupMessage/groupMessage.module';
import { GroupModule } from './group/group.module';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath }),
        MulterModule.register(),
        EventEmitterModule.forRoot(),
        DbModule,
        AuthModule,
        UsersModule,
        GatewayModule,
        MessagePrivateModule,
        FriendsModule,
        EventModule,
        ConversationsModule,
        GroupModule,
        GroupMessageModule,
    ],
})
export class AppModule {}
