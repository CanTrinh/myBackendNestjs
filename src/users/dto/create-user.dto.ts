// register.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  // Optional fields if you want them at signup
  @IsOptional()
  profilePic?: string;
  bio?: string;
}
