import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryFilterDto {
  @IsOptional()
  @IsString({ message: 'O filtro deve ser uma string válida.' })
  @Transform(({ value }) => value?.trim())
  filter?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;

  @IsOptional()
  @IsString({ message: 'O nome científico deve ser uma string.' })
  @Transform(({ value }) => value?.trim())
  scientific_name?: string;
}
