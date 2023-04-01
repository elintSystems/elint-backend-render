interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    avatar?: string;
    id?: string;
    is_admin?: boolean;
}

export { ICreateUserDTO };