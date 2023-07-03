export interface ProfileUser {
    about?: { lable: string; content: string }[];
    avatar?: string;
    banner?: string;
}

export interface UserWithAuth {
    user: {
        id: number;
        email: string;
        provider: "LOCAL" | "GOOGLE" | "FACEBOOK";
        provider_id: string | null;
        created_at: string;
        updated_at: string;
        fullname: string;
        profile?: ProfileUser;
    };
    accessToken: string;
}

export interface User {
    id: number;
    fullname: string;
    email: string;
    provider: ProviderType;
    provider_id: null | string;
    active: boolean;
    created_at: string;
    updated_at: string;
    profile?: ProfileUser;
}

export enum ProviderType {
    LOCAL = "lOCAL",
    FACEBOOK = "FACEBOOK",
    GOOGLE = "GOOGLE",
}

export interface CreateNewUserByProvider {
    email: string;
    provider: ProviderType;
    provider_id: string;
    fullname: string;
}
