import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { AuthModule } from '../auth/auth.module';
import { ApiKeyGuard } from '../common/guard/x-api-key.guard';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([
      Tournament
    ])
  ],
  controllers: [TournamentController],
  providers: [TournamentService,ApiKeyGuard],
  exports: [TournamentService]
})
export class TournamentModule {}
