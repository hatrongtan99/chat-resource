import {
    IsArray,
    IsEmail,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
} from 'class-validator';

export class ProfileUpdateDTO {
    @IsOptional()
    @IsArray()
    about?: { lable: string; content: string }[];
}

export class GetUserProviderDTO {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    providerId: string;
}
