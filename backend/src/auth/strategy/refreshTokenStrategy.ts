import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SECRET_JWT_REFRESH_TOKEN } from 'src/utils/constant';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        await this.validateRefresToken(request);
        return true;
    }

    async validateRefresToken(req: Request) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new UnauthorizedException('Invalid refreshtoken');
        }

        let [type, token] = refreshToken.split(' ') ?? [];

        if (!token) {
            throw new UnauthorizedException('Invalid refreshtoken');
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get(SECRET_JWT_REFRESH_TOKEN),
            });

            const user = await this.userService.findUser({ id: payload.id });
            req['user'] = user;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new HttpException(
                    'Refresh token expired',
                    HttpStatus.FORBIDDEN,
                );
            }
            throw new BadRequestException('Bad request refresh token');
        }
    }
}
