import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateTournamentDto {

    @IsString()
    name: string;

    @IsDateString()
    date: Date

    @IsNumber()
    duration: number
}
