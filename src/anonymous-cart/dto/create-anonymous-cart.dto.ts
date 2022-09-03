import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnonymousCartDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
