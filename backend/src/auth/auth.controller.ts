import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Routes } from 'src/utils/contant';
import { UsersService } from 'src/users/users.service';
import { UserRegisterDTO, UserSigninDTO } from './dto';
import { LocalStrategy } from './strategy/localStrategy';
import { AuthenticateRequest } from './types';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './decorators/public';
import { GooleAuthGuard } from './guards/googleGuard';

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        private readonly userSevice: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Public()
    @Post('register')
    async register(@Body() createUserDTO: UserRegisterDTO) {
        const newUser = await this.userSevice.createUser(createUserDTO);
        delete newUser.password;
        return newUser;
    }

    @Public()
    @UseGuards(LocalStrategy)
    @Post('signin')
    async signin(
        @Req() req: AuthenticateRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        return await this.authService.signin(req, res);
    }

    @Public()
    @UseGuards(GooleAuthGuard)
    @Get('google')
    async googleAuth() {
        return 'asdb';
    }

    @Public()
    @UseGuards(GooleAuthGuard)
    @Get('success')
    async loginSuccess(
        @Req() req: AuthenticateRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        return await this.authService.signin(req, res);
    }

    @Delete('delete')
    async delete() {
        return await this.userSevice.delete();
    }
}
