import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { SECRET_JWT_ASCCESS_TOKEN } from 'src/utils/contant';

export class WebSocketAdapter extends IoAdapter {
    private jwtService: JwtService;
    private configService: ConfigService;
    private userService: UsersService;

    constructor(private app: INestApplicationContext) {
        super(app);
        this.jwtService = this.app.get(JwtService);
        this.configService = this.app.get(ConfigService);
        this.userService = this.app.get(UsersService);
    }

    createIOServer(port: number, options?: any) {
        const server: Server = super.createIOServer(port, options);
        server.use(async (client: Socket, next) => {
            const [type, token] =
                client.handshake.headers.authorization?.split(' ') ?? [];

            if (!token) {
                return next(new Error('unauthorization'));
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get(SECRET_JWT_ASCCESS_TOKEN),
            });
            if (!payload) {
                return next(new Error('Invalid token!'));
            }
            const user = await this.userService.findUser({ id: payload.id });
            if (!user) {
                return next(new Error('User not found!'));
            }
            client['user'] = user;
            next();
        });
        return server;
    }
}
