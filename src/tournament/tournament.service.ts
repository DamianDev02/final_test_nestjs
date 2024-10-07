import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { GenericService } from 'src/common/services/base.service';
import { Tournament } from './entities/tournament.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentService extends GenericService<Tournament> {
  constructor(@InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>){
    super(tournamentRepository);
  }

  async createTournament(createTournamentDto: CreateTournamentDto) : Promise<Tournament> {
    return super.create(createTournamentDto)
  }

  async findAllTournaments(): Promise<Tournament[]> {
    return super.findAll()
  }

  async findTournamentById(id: string): Promise<Tournament> {
    return super.findOne(id)
  }

  async updateTournament(id: string, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    return super.update(id, updateTournamentDto)
  }

  async deleteTournament(id: string): Promise<Tournament> {
    return super.delete(id)
  }

  async findTournamentByname(name: string) : Promise<Tournament> {
    return this.tournamentRepository.findOne({ where: { name } });
  }
  
}
