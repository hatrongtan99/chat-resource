import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { AuthenticateRequest, TypeToken } from './types';
import { compareValue } from 'src/utils';
import { CookieOptions, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
    SECRET_JWT_ASCCESS_TOKEN,
    SECRET_JWT_REFRESH_TOKEN,
} from 'src/utils/constant';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/db/entities';
import { Repository } from 'typeorm';

const MAX_AGE_ACCESSTOKEN = 1000 * 60 * 5;

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    signin(req: AuthenticateRequest, res: Response) {
        const accessToken = this.jwtService.sign(
            { id: req.user.id },
            {
                secret: this.configService.get<string>(
                    SECRET_JWT_ASCCESS_TOKEN,
                ),
                expiresIn: '5m',
            },
        );
        const refreshToken = this.jwtService.sign(
            { id: req.user.id },
            {
                secret: this.configService.get<string>(
                    SECRET_JWT_REFRESH_TOKEN,
                ),
                expiresIn: '7d',
            },
        );
        this.sendToken(res, accessToken, TypeToken.ACCESS_TOKEN);
        this.sendToken(res, refreshToken, TypeToken.REFRESH_TOKEN);
        return {
            user: req.user,
            accessToken,
            refreshToken,
            accessTokenExpires: Date.now() + MAX_AGE_ACCESSTOKEN,
        };
    }

    refreshToken(req: AuthenticateRequest, res: Response) {
        const token = this.jwtService.sign(
            { id: req.user.id },
            {
                secret: this.configService.get(SECRET_JWT_ASCCESS_TOKEN),
                expiresIn: '5m',
            },
        );

        return {
            accessToken: token,
            accessTokenExpires: Date.now() + MAX_AGE_ACCESSTOKEN,
        };
    }

    async validateUser(email: string, password: string) {
        const user = (await this.userService.findUser(
            { email },
            { selectAll: true },
        )) as Users;
        if (user) {
            const matchPass = await compareValue(password, user.password);
            if (matchPass) return user;
        }
        return null;
    }

    sendToken(
        res: Response,
        token: string,
        type: TypeToken,
        options?: CookieOptions,
    ) {
        const rootOptions = {
            httpOnly: true,
            signed: true,
        } as CookieOptions;
        res.cookie(type, token, { ...rootOptions, ...options });
    }
}
