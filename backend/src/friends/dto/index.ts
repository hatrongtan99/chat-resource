import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFriendRequestDto {
    @IsNotEmpty()
    @IsNumber()
    receicId: number;
}

export class CancelFriendRequestDto {
    @IsNotEmpty()
    @IsNumber()
    ortherId: number;
}

export class UnfriendDto {
    @IsNotEmpty()
    @IsNumber()
    ortherId: number;
}

export class AcceptRequestFriendDto {
    @IsNotEmpty()
    @IsNumber()
    ortherId: number;
}

export class SearchFriendsDto {
    @IsNotEmpty()
    @IsString()
    _q: string;
}
