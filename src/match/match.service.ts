import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { GenericService } from '../common/services/base.service';
import { Match } from './entities/match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerService } from '../player/player.service';
import { TournamentService } from '../tournament/tournament.service';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class MatchService extends GenericService<Match> {
    constructor(
        @InjectRepository(Match) private readonly matchRepository: Repository<Match>,
        private readonly playerService: PlayerService,
        private readonly tournamentService: TournamentService,
    ) {
        super(matchRepository);
    }

    private async findTournamentById(tournamentId: string): Promise<any> {
        const tournament = await this.tournamentService.findOne(tournamentId);
        if (!tournament) {
            throw new NotFoundException('Tournament not found');
        }
        return tournament;
    }

    private determineMatchWinner(match: Match, players: Player[]): void {
        const allScoresZero = players.every(player => player.score === 0);

        if (allScoresZero) {
            match.winnerId = null;
        } else {
            const sortedPlayers = players.sort((a, b) => b.score - a.score);
            match.winnerId = sortedPlayers[0].id;
        }
    }

    private extractPlayerInfo(players: Player[]): { id: string; name: string; score: number }[] {
        return players.map(player => ({
            id: player.id,
            name: player.name,
            score: player.score,
        }));
    }

    private assignRandomScores(players: Player[]): void {
        players.forEach(player => {
            player.score = Math.floor(Math.random() * 101); 
        });
    }

    private async updatePlayerScores(players: Player[]): Promise<void> {
        
        await Promise.all(players.map(player => this.playerService.updateScoreUser(player.id, { score: player.score })));
    }


    async getAllMatches(): Promise<Match[]> {
        return super.findAll();
    }

    async getMatchById(id: string): Promise<Match> {
        return super.findOne(id);
    }

    async removeMatch(id: string): Promise<Match> {
        return super.delete(id);
    }

    async createMatch(createMatchDto: CreateMatchDto): Promise<{ match: Match; players: { id: string; name: string; score: number }[] }> {
        const { tournamentId } = createMatchDto;
        const players = await this.playerService.findAllPlayers();
        const tournament = await this.findTournamentById(tournamentId);

        this.assignRandomScores(players);

        await this.updatePlayerScores(players);

        const match = this.matchRepository.create({
            tournament,
            players: players.map(player => player.id),
        });

        
        this.determineMatchWinner(match, players);
        await this.matchRepository.save(match);

        return {
            match,
            players: this.extractPlayerInfo(players),
        };
    }
}
