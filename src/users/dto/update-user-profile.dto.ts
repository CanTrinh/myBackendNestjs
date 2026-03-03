import { IsUrl, IsString, } from 'class-validator';

export class UpdateUserProfileDto {
  // Optional fields if you want them at signup
  @IsUrl()
  profilePic?: string; //S3 url string

  @IsString()
  bio?: string;
}
