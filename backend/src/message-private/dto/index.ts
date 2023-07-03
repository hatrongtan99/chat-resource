import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNewMessageDto {
    @IsOptional()
    @IsString()
    content?: string;
}

export class QueryStringGetMessagesDTO {
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    limit: number;

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    offset: number;
}

export class InfoFileDTO {
    @IsString()
    @IsNotEmpty()
    file_name: string;

    @IsNotEmpty()
    @IsString()
    type: string;
}

export class DeleteMessageDTO {
    @IsNotEmpty()
    @IsNumber()
    messageId: number;

    @IsNotEmpty()
    @IsNumber()
    conversationId: number;
}
