import { IsString, MaxLength, IsUrl } from 'class-validator';

export class CreateMushroomDto {
  @IsString({ message: 'O nome científico deve ser uma string válida.' })
  @MaxLength(100, {
    message: 'O nome científico deve ter no máximo 100 caracteres.',
  })
  scientificName: string;

  @IsUrl({}, { message: 'A URL da imagem deve ser válida.' })
  @MaxLength(2083, {
    message: 'A URL da imagem deve ter no máximo 2083 caracteres.',
  })
  imageUrl: string;

  @IsString({ message: 'A dica deve ser uma string válida.' })
  @MaxLength(255, { message: 'A dica deve ter no máximo 255 caracteres.' })
  hint: string;

  @IsString({ message: 'A descrição deve ser uma string válida.' })
  description: string;
}
