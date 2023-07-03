import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { Routes } from 'src/utils/constant';
import { UserService } from './users.service';
import { GetUserProviderDTO } from './dto';
import { Public } from 'src/auth/decorators/public';

@Controller(Routes.USERS)
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Get('provider')
    async getUserProvider(@Query() query: GetUserProviderDTO) {
        const user = await this.userService.findUser({
            email: query.email,
            provider_id: query.providerId,
        });
        if (user) {
            return user;
        }
        throw new NotFoundException('User not found');
    }
}
