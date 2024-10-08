import { Controller, Post, Get, Put, Delete, Param, Body, Patch } from '@nestjs/common';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { UpdateScorePLayerDto } from './dto/updateScore.dto';
import { Player } from './entities/player.entity';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}


  @Get()
  async findAll(): Promise<Player[]> {
    return this.playerService.findAllPlayers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Player> {
    return this.playerService.findPlayerById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return this.playerService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Player> {
    return this.playerService.deletePlayer(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Player> {
    return this.playerService.findPlayerByname(name);
  }

  @Get('email/:email')
  async findWithPassword(@Param('email') email: string): Promise<Player> {
    return this.playerService.findPlayerWithPassword(email);
  }

  @Patch(':id/score')
  async updateScore(@Param('id') id: string, @Body() updateScorePlayerDto: UpdateScorePLayerDto): Promise<Player> {
    return this.playerService.updateScoreUser(id, updateScorePlayerDto);
  }
}
