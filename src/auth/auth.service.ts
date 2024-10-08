import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BcryptService } from '../common/services/bcrypt.service';
import { PlayerService } from '../player/player.service';
import { RegisterAdminDto } from './dto/registerAdmin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService
  ) { }

  private generateToken(user: any): string {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async registerPlayer(registerDto: RegisterDto): Promise<RegisterDto> {
    return this.playerService.create(registerDto)
  }

  async loginUser({ email, password }: LoginDto) {
    const findPlayer = await this.playerService.findPlayerWithPassword(email)

    if (!findPlayer) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await this.bcryptService.comparePassword(password, findPlayer.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = this.generateToken(findPlayer);
    return {
      accessToken
    };
  }

  async registerAdmin(adminDto: RegisterAdminDto) : Promise<RegisterAdminDto> {
    return this.playerService.create(adminDto)
  }



}