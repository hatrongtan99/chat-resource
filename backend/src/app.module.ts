import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath }),
        DbModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
