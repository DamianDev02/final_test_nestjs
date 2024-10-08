import { Controller, Post, Body, Get, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAdminDto } from './dto/registerAdmin.dto';


@ApiTags('Auth')
@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDt0: RegisterDto){
    return this.authService.registerPlayer(registerDt0);
  }

  @Post('register-admin')
  async registerAdmin(@Body() adminDto: RegisterAdminDto){
    return this.authService.registerAdmin(adminDto);
  }
 
  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return this.authService.loginUser(loginDto);
  }




}