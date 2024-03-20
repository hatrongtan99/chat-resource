import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class GooleAuthGuard extends AuthGuard('google') {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}
