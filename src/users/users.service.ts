
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
//import { User, Prisma } from 'src/generated/client';
import { User, Prisma } from '@prisma/client';
import { encodePassword } from 'src/bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService,
              private eventEmitter: EventEmitter2
  ) {}

  name: string

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<any> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { role: true }
    });
  }

  async findUserByName( userName: string) 
  {
    return this.prisma.user.findFirst({
      where: {name: userName,},
      include: { role: true },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({  
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: RegisterDto): Promise<User> {
    const hashedPassword= await encodePassword(data.password);
    //const userRole = await this.prisma.role.findUnique({ where: { role_name: 'USER' } });
    //Use findFirstOrThrow with rejectOnNotFound(not null) to syn with type of roleId
    const userRole = await this.prisma.role.findFirstOrThrow({ where: {role_name: 'USER' }, });
    this.eventEmitter.emit('user.created', data);
    return this.prisma.user.create({
      data:{
        name: data.name,
        email: data.email,
        password: hashedPassword,
        roleId: userRole.id
      }
    });


  }

  async updateUser(userProfileUpdateData: UpdateUserProfileDto, userId: number): Promise<User> {
  
    return this.prisma.user.update({
      where:{
        id: userId,
      },
      data: {
        bio: userProfileUpdateData.bio,
        profilePic: userProfileUpdateData.profilePic,
      }

    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
