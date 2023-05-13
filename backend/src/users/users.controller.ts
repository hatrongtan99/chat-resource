import { Controller, Get, Req } from '@nestjs/common';
import { AuthenticateRequest } from 'src/auth/types';

@Controller('users')
export class UsersController {
    @Get()
    getUser(@Req() req: AuthenticateRequest) {
        return;
    }
}
