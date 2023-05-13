import { PassportStrategy } from '@nestjs/passport';
import {
    Strategy,
    StrategyOptions,
    VerifyCallback,
} from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { CreateUserParams } from 'src/users/type';
import { ProviderType, Users } from 'src/db/entities/Users';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            clientID:
                '988341000108-42tjfa7rar3gh70d18dqrun247vv95au.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:8080/api/auth/success',
            scope: ['email', 'profile'],
            accessType: 'offline',
            prompt: 'consent',
        });
    }
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const params = {
            email: emails[0].value,
            fullname: name.givenName + ' ' + name.familyName,
            provider: ProviderType.GOOGLE,
            provider_id: profile.id,
            active: true,
        } as CreateUserParams;

        const exitsUser = await this.usersService.findUser({
            email: params.email,
            provider_id: profile.id,
        });
        if (exitsUser) {
            return exitsUser;
        }
        const user = await this.usersService.createUser(params);
        return user;
    }
}
