import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { PlayerModule } from '../player/player.module';
import { TournamentModule } from '../tournament/tournament.module';
import { ApiKeyGuard } from '../common/guard/x-api-key.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[PlayerModule, TournamentModule, AuthModule,
    TypeOrmModule.forFeature([
      Match
    ])
  ],
  controllers: [MatchController],
  providers: [MatchService, ApiKeyGuard],
})
export class MatchModule {}
