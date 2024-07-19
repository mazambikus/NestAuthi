import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string = '';

    @IsString()
    @IsNotEmpty()
    readonly password: string = '';
}
