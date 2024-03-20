import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_CONTANT } from '../decorators/public';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SECRET_JWT_ASCCESS_TOKEN } from 'src/utils/constant';
import { Request } from 'express';

@Injectable()
export class AuthenticationStrategy implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic: boolean = this.reflector.getAllAndOverride(
            IS_PUBLIC_CONTANT,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) return true;
        const request = context.switchToHttp().getRequest() as Request;
        await this.validateToken(request);
        return true;
    }

    private async validateToken(req: Request) {
        let [type, token] = req.headers.authorization?.split(' ') ?? [];

        if (!token) {
            token = req.signedCookies.accessToken;
            if (!token) {
                throw new UnauthorizedException('Invalid token');
            }
        }

        try {
            const decode = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>(
                    SECRET_JWT_ASCCESS_TOKEN,
                ),
            });

            const user = await this.userService.findUser({ id: decode?.id });
            if (!user) {
                throw new UnauthorizedException('Unauthorization');
            }
            req['user'] = user;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new HttpException(
                    'Access token expired!',
                    HttpStatus.FORBIDDEN,
                );
            }
            throw new BadRequestException('Bad request access token');
        }
    }
}
