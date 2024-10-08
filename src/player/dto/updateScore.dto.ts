import { IsNumber, Max, Min } from "class-validator";

export class UpdateScorePLayerDto {
    @IsNumber()
    @Min(0)
    @Max(300)
    score:number
}