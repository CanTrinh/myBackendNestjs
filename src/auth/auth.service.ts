
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswords } from '../bcrypt';
import { JwtService} from '@nestjs/jwt';
import { jwtConstants} from './constants'
import { join } from 'path';


/*export interface User {
  token: string;
  user: {}
}*/

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService,
  ) {}

  async signIn(name: string, Password: string): Promise<{ access_token: string; userInfor: {}}> {
    const user = await this.usersService.findUserByName(name) || await this.usersService.user({email: name});
    //tim user theo name cua no trong database
    //const hashedPassword= await encodePassword(password); 
    //console.log(hashedPassword);
    // hash pass cua request den de so sanh voi user.password da hash va da luu vao database
    if (user){
      //console.log(comparePasswords(Password,user?.password));
      if (comparePasswords(Password,user.password)!==true) {
      throw new UnauthorizedException();
      }else {
      
      const userInfor = { sub: user?.id, name: user?.name, role: user.role.role_name};
      const access_token= await this.jwtService.signAsync(userInfor, jwtConstants);
      
     
      return {
        access_token,
        userInfor
      }
      }
    }else{
      throw new UnauthorizedException();
    } 
  }
}
