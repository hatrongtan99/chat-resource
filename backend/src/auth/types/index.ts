import { Request } from 'express';

export type UserSiginParams = {
    email: string;
    password: string;
};

export interface AuthenticateRequest extends Request {
    user?: any;
}

export enum TypeToken {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
}
