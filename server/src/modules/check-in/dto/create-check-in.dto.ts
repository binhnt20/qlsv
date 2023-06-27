import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateCheckInDto {
  @IsOptional()
  @Transform(({ value }) => +value)
  userId: number;

  @Transform(({ value }) => +value)
  tableId: number;
}

export class GetCheckinClassDto {
  @Transform(({ value }) => +value)
  classId: number;
}
