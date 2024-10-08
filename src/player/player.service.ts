import { Injectable } from '@nestjs/common';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { GenericService } from '../common/services/base.service';
import { BcryptService } from '../common/services/bcrypt.service';
import { UpdateScorePLayerDto } from './dto/updateScore.dto';

@Injectable()
export class PlayerService extends GenericService<Player> {
  constructor(@InjectRepository(Player) private readonly playerRepository: Repository<Player>, 
private readonly bcryptService: BcryptService){
    super(playerRepository);
  }

  async create(createPlayerDto: any): Promise<Player> {
    const hashedPassword = await this.bcryptService.hashPassword(createPlayerDto.password);
    const newPlayer = { ...createPlayerDto, password: hashedPassword}
    return await super.create(newPlayer);
  }

  async findAllPlayers(): Promise<Player[]> {
    return super.findAll()
  }

  async findPlayerById(id: string): Promise<Player> {
    return this.playerRepository.findOne({where: {id},
      select: ['id','name', 'nickname', 'age']
    })
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

  async updateScoreUser(id: string, updateScorePlayerDto: UpdateScorePLayerDto): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id } });
    player.score = updateScorePlayerDto.score;
    return this.playerRepository.save(player);
}

}
