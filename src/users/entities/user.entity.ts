import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class User {
    id: number;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        email: string,
        password: string,
        role: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
