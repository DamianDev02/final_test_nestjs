import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './entities/match.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ApiKeyGuard } from '../common/guard/x-api-key.guard';

@ApiTags('Matches')
@Auth(Role.ADMIN)
@UseGuards(ApiKeyGuard)
@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async createMatch(@Body() createMatchDto: CreateMatchDto): Promise<{ match: Match; players: any[] }> {
    return this.matchService.createMatch(createMatchDto);
  }

  @Get()
  async findAllMatches(): Promise<Match[]> {
    return this.matchService.getAllMatches();
  }

  @Get(':id')
  async findMatchById(@Param('id') id: string): Promise<Match> {
    return this.matchService.getMatchById(id);
  }

  @Delete(':id')
  async deleteMatch(@Param('id') id: string): Promise<void> {
    await this.matchService.removeMatch(id);
  }
}
