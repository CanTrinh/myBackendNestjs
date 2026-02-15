import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './signInUser-auth.dto';

export class UpdateAuthDto extends PartialType(SignInDto) {}
