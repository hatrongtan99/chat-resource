import {
    ExecutionContext,
    SetMetadata,
    createParamDecorator,
} from '@nestjs/common';
import { AuthenticateRequest } from '../types';
export const IS_PUBLIC_CONTANT = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_CONTANT, true);

export const AuthUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest<AuthenticateRequest>();
        return req.user;
    },
);
