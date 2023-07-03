import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Routes } from 'src/utils/constant';
import { UserService } from 'src/users/users.service';
import { CreateUserDTO, UserRegisterDTO } from './dto';
import { LocalStrategy } from './strategy/localStrategy';
import { AuthenticateRequest } from './types';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './decorators/public';
import { GooleAuthGuard } from './guards/googleGuard';
import { RefreshTokenStrategy } from './strategy/refreshTokenStrategy';

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        private readonly userSevice: UserService,
        private readonly authService: AuthService,
    ) {}

    @Public()
    @Post('register')
    async register(@Body() userRegisterDto: UserRegisterDTO) {
        const newUser = await this.userSevice.createUser(userRegisterDto);
        delete newUser.password;
        return newUser;
    }

    @Public()
    @Post('create')
    async createNewUser(@Body() createUserDto: CreateUserDTO) {
        return await this.userSevice.createUser(createUserDto);
    }

    @Public()
    @UseGuards(LocalStrategy)
    @Post('signin')
    async signin(
        @Req() req: AuthenticateRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.signin(req, res);
    }

    @Get('success')
    async loginSuccess(
        @Req() req: AuthenticateRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.signin(req, res);
    }

    @Public()
    @UseGuards(RefreshTokenStrategy)
    @Post('refresh-token')
    async refreshToken(
        @Req() req: AuthenticateRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.refreshToken(req, res);
    }

    @Public()
    @UseGuards(GooleAuthGuard)
    @Get('google')
    async googleAuth() {}

    @Public()
    @UseGuards(GooleAuthGuard)
    @Get('social/callback')
    async callbackSocial(
        @Req() req: AuthenticateRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.signin(req, res);
    }

    @Post('success')
    @UseGuards(GooleAuthGuard)
    async loginSocialSuccess(
        @Req() req: AuthenticateRequest,
        @Res({ passthrough: true }) res: Response,
    ) {
        return this.authService.signin(req, res);
    }

    @Delete('delete')
    async delete() {
        return await this.userSevice.delete();
    }
}
