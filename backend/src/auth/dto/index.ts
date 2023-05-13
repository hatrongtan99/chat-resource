import { IsString, IsNotEmpty, IsEmail, IsEmpty } from 'class-validator';
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
