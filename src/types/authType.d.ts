export type SignUpType = {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role?: string;
}

export type LoginType = {
    email: string;
    password: string;
}