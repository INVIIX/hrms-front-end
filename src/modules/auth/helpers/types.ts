export type TCredentials = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export type TUser = {
    id?: number | string;
    email: string;
    name: string;
    avatar?: string;
    role?: string;
};