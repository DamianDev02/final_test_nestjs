import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/common/services/base.service';
import { BcryptService } from 'src/common/services/bcrypt.service';

@Injectable()
export class PlayerService extends GenericService<Player> {
  constructor(@InjectRepository(Player) private readonly playerRepository: Repository<Player>, 
private readonly bcryptService: BcryptService){
    super(playerRepository);
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const hashedPassword = await this.bcryptService.hashPassword(createPlayerDto.password);
    const newPlayer = { ...createPlayerDto, password: hashedPassword}
    return await super.create(newPlayer);
  }

  async findAllPlayers(): Promise<Player[]> {
    return super.findAll()
  }

  async findPlayerById(id: string): Promise<Player> {
    return super.findOne(id)
  }

  async updatePlayer(id:string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return super.update(id, updatePlayerDto)
  }

  async deletePlayer(id: string): Promise<Player> {
    return super.delete(id)
  }

  async findPlayerByname(name: string): Promise<Player> {
    return this.playerRepository.findOne({ where: { name } });
  }

  async findPlayerWithPassword(email: string) : Promise<Player> {
    return this.playerRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });
  }
}
