import { Type } from 'class-transformer';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';

export class Member {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class CreateNewGroupDTO {
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class AddFriendToGroupDTO {
    @IsNotEmpty()
    @IsNumber()
    groupId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Member)
    usersIdList: Member[];
}

export class KickOutGroupDTO {
    @IsNotEmpty()
    @IsNumber()
    ortherId: number;

    @IsNotEmpty()
    @IsNumber()
    groupId: number;
}

export class GroupTranferOwnerDTO {
    @IsNotEmpty()
    @IsNumber()
    ortherId: number;
}
