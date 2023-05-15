import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthenticateRequest, TypeToken } from './types';
import { compareValue } from 'src/utils';
import { CookieOptions, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SECRET_JWT_ASCCESS_TOKEN } from 'src/utils/contant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signin(req: AuthenticateRequest, res: Response) {
        const token = await this.jwtService.signAsync(
            { id: req.user.id },
            {
                secret: this.configService.get<string>(
                    SECRET_JWT_ASCCESS_TOKEN,
                ),
            },
        );
        this.sendToken(res, token, TypeToken.ACCESS_TOKEN);
        return { user: req.user, asscessToken: token };
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUser(
            { email },
            { selectAll: true },
        );
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
