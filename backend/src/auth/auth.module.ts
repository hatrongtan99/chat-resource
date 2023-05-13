import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationStrategy } from './strategy/authenticationStrategy';
import { GoogleStrategy } from './strategy/gooleStrategy';
import { SessionStrategy } from './strategy/sessionStrategy';

@Module({
    imports: [JwtModule.register({ global: true }), UsersModule],
    providers: [
        AuthService,
        { provide: APP_GUARD, useClass: AuthenticationStrategy },
        SessionStrategy,
        GoogleStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
