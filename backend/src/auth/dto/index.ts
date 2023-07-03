import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsEmpty,
    IsOptional,
    isNotEmpty,
} from 'class-validator';
import { ProviderType } from 'src/db/entities/Users';

export class UserSigninDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UserRegisterDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullname: string;
}

export class CreateUserDTO {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    provider: ProviderType;

    @IsNotEmpty()
    @IsString()
    provider_id: string;

    @IsNotEmpty()
    @IsString()
    fullname: string;
}
