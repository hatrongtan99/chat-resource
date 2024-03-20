import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class AboutItem {
    @IsNotEmpty()
    @IsString()
    lable: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}

export class GetUserProviderDTO {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    providerId: string;
}
