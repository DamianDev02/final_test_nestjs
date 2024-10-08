import { IsNotEmpty, IsUUID, IsOptional, IsArray, ArrayMinSize } from 'class-validator';

export class CreateMatchDto {
    @IsUUID()
    @IsOptional()
    winnerId?: string;


    @IsUUID()
    @IsNotEmpty()
    tournamentId: string;
}
