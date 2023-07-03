import { IsOptional, IsString } from 'class-validator';

export class CreateNewMessageGroupDTO {
    @IsOptional()
    @IsString()
    content: string;
}
