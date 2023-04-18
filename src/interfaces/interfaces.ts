export interface IUserRequest {
    name: string,
    email: string,
    password: string
}

export interface ISendEmailRequest {
    to: string,
    subject: string,
    text: string,
}

export interface UpdateUserDto {
    email?: string;
    password?: string;
    name?: string;
    resetToken?: string;
}