import { IsArray, IsEmpty, IsOptional, Max } from 'class-validator';

export class ProfileUpdateDTO {
    @IsOptional()
    @IsArray()
    about?: { lable: string; content: string }[];
}
