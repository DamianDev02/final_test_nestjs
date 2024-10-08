// tournament.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ApiKeyGuard } from '../common/guard/x-api-key.guard';

@ApiTags('Tournament')
@Auth(Role.ADMIN)
@UseGuards(ApiKeyGuard)
@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  async create(@Body() createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    return this.tournamentService.createTournament(createTournamentDto);
  }

  @Get()
  async findAll(): Promise<Tournament[]> {
    return this.tournamentService.findAllTournaments();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tournament> {
   return this.tournamentService.findTournamentById(id);
     ;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ): Promise<Tournament> {
    const tournament = await this.tournamentService.findTournamentById(id);
    if (!tournament) {
      throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND);
    }
    return this.tournamentService.updateTournament(id, updateTournamentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const tournament = await this.tournamentService.findTournamentById(id);
    if (!tournament) {
      throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND);
    }
    await this.tournamentService.deleteTournament(id);
  }
}
