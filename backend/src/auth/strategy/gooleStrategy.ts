import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { CreateUserParams } from 'src/users/type';
import { ProviderType } from 'src/db/entities/Users';
import {
    CALBACK_URL_AUTH,
    CLIENT_GOOGLE_ID,
    CLIENT_GOOGLE_SECRET,
} from 'src/utils/contant';
import { AuthenticateRequest } from '../types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            clientID: configService.get<string>(CLIENT_GOOGLE_ID),
            clientSecret: configService.get<string>(CLIENT_GOOGLE_SECRET),
            callbackURL: CALBACK_URL_AUTH,
            scope: ['email', 'profile'],
            passReqToCallback: true,
            // accessType: 'offline',
            // prompt: 'consent',
        });
    }
    async validate(
        req: AuthenticateRequest,
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
