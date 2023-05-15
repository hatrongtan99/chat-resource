import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GatewayModule } from './gateway/gateways.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { MulterModule } from '@nestjs/platform-express';
import { MessagePrivateModule } from './message-private/message-private.module';
import { FriendsModule } from './friends/friends.module';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath }),
        MulterModule.register(),
        DbModule,
        AuthModule,
        UsersModule,
        GatewayModule,
        UploadFileModule,
        MessagePrivateModule,
        FriendsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
