import { ProviderType, Users } from 'src/db/entities/Users';

export type FindUserParams = Partial<{
    id: number;
    email: string;
    username: string;
    provider_id: string;
}>;

export type CreateUserParams = {
    email?: string;
    password?: string;
    provider?: ProviderType;
    provider_id?: string;
    fullname?: string;
};

export type OptionFindUser = {
    selectAll?: boolean;
};
