import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, IsOptional } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterAdminDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    age: number;

    @IsEmail({},)
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20,)
    password: string;

    @IsOptional()
    role: Role
}
