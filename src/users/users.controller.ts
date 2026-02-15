import { Controller, Get, Post, Body, Put, Param, Delete, Sse, Req, UnauthorizedException, UseGuards,UseInterceptors, UploadedFile,
 } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { User} from 'src/generated/client';
import { User} from '@prisma/client';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
//import { interval, map, Observable } from 'rxjs';


/*export interface MessageEvent {
  data: string | UserModel["name"];
  id?: string;
  type?: string;
  retry?: number;
}*/


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async signupUser(
    @Body() userData: { name: string , email: string, password: string},
  ): Promise<User> {
    //console.log('Received data:', userData);
    const existUse = await this.usersService.findUserByName(userData.name);
    if(existUse){
      throw new UnauthorizedException;
    } else {
      return this.usersService.createUser(userData);
    }
  }

  
  /*@Sse('add')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { name: 'world' } })));
  }*/


  @Get()
  findAll() {
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profilePic'))
  @Put('profile/update-profile')
  async updateProfile(
    //@UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateUserProfileDto,
     @Req() req){
     const userId = req.user.sub; // logged-in user ID from JWT
     let profilePicUrl: string | undefined;

    /*if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'profile_pics',
      });
      profilePicUrl = result.secure_url;
    }*/

     //console.log(userId);
    return this.usersService.updateUser(dto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  
  }
}
