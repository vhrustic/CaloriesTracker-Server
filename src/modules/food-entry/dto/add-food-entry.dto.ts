import {
  IsDateString,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class AddFoodEntryDto {
  @IsString()
  @MaxLength(300)
  name: string;

  @IsNumber()
  @Min(1)
  @Max(10000)
  calories: number;

  @IsDateString()
  takenAt: Date;
}
