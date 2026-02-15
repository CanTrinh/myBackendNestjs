import {
  IsInt,
  IsString,
  IsOptional,
  IsBoolean,
  IsUrl,
  ValidateNested,
  ArrayMinSize,
  MaxLength
} from 'class-validator';
import { Type } from 'class-transformer';

export class CategoryDto {
  @IsInt()
  id: number;

  @IsString()
  type: string;
}


export class CreatePostDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsUrl({}, { message: 'mediaUrl must be a valid URL' })
  mediaUrl?: string;
}

  

 

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsUrl()
  video?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories?: CategoryDto[];
}
