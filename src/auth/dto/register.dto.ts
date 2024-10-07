import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    nickname: string;

    @IsNumber()
    age: number;

    @IsEmail({},)
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20,)
    password: string;

}
