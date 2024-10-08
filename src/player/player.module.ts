import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { BcryptService } from '../common/services/bcrypt.service';
import { PlayerController } from './player.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player])
  ],
  controllers: [PlayerController],
  providers: [PlayerService, BcryptService],
  exports: [PlayerService]
})
export class PlayerModule {}
