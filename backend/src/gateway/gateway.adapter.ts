import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { Server, Socket } from 'socket.io';
import { UserService } from 'src/users/users.service';
import { SECRET_JWT_ASCCESS_TOKEN } from 'src/utils/constant';

export class WebSocketAdapter extends IoAdapter {
    private jwtService: JwtService;
    private configService: ConfigService;
    private userService: UserService;

    constructor(private app: INestApplicationContext) {
        super(app);
        this.jwtService = this.app.get(JwtService);
        this.configService = this.app.get(ConfigService);
        this.userService = this.app.get(UserService);
    }

    createIOServer(port: number, options?: any) {
        options.cors = {
            origin: this.configService.get<string>('URL_CLIENT')?.split(','),
            credentials: true,
        };
        const server: Server = super.createIOServer(port, options);
        server.use(async (client: Socket, next) => {
            const [type, token] =
                client.handshake.auth['Authorization']?.split(' ') ??
                client.handshake.headers.authorization?.split(' ') ??
                [];

            if (!token) {
                return next(new Error('unauthorization'));
            }
            try {
                const payload = await this.jwtService.verifyAsync(token, {
                    secret: this.configService.get(SECRET_JWT_ASCCESS_TOKEN),
                });
                if (!payload) {
                    return next(new Error('Invalid token!'));
                }
                const user = await this.userService.findUser({
                    id: payload.id,
                });
                if (!user) {
                    return next(new Error('User not found!'));
                }
                client['user'] = user;
                next();
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    console.log('token expired!!!');
                } else {
                    console.log('error in addapter socketIo:::', error);
                }
            }
        });
        return server;
    }
}
