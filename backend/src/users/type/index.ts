import { ProviderType, Users } from 'src/db/entities/Users';

export type FindUserParams = Partial<{
    id: number;
    email: string;
    provider_id: string;
}>;

export type SearchUserParams = Partial<{
    exceptId: number;
    username: string;
}>;

export type CreateUserParams = Partial<{
    email: string;
    password: string;
    provider: ProviderType;
    provider_id: string;
    fullname: string;
}>;

export type OptionFindUser = {
    selectAll?: boolean;
};

export type UpdateProfileParams = {
    about?: { lable: string; content: string }[];
    avatar?: Express.Multer.File;
    banner?: Express.Multer.File;
};
