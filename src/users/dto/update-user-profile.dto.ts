import { IsUrl, IsString, } from 'class-validator';

export class UpdateUserProfileDto {
  // Optional fields if you want them at signup
  @IsUrl()
  profilePic?: string;

  @IsString()
  bio?: string;
}
