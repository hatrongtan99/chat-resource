import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthenticateRequest } from '../types';
import { Users } from 'src/db/entities';

@Injectable()
export class LocalStrategy implements CanActivate {
    constructor(private readonly authService: AuthService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: AuthenticateRequest = context.switchToHttp().getRequest();
        const { email, password } = req.body;
        const user = (await this.authService.validateUser(
            email,
            password,
        )) as Users;

        if (!user) return false;
        delete user.password;
        req.user = user;
        return true;
    }
}
