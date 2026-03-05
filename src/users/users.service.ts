
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
//import { User, Prisma } from 'src/generated/client';
import { User, Prisma } from '@prisma/client';
import { encodePassword } from '../bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RegisterDto } from './dto/create-user.dto';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

import * as sharp from 'sharp';

@Injectable()
export class UsersService {
  name: string

  private s3 = new S3Client({ 
    region: process.env.AWS_REGION!, 
    credentials: {
       accessKeyId: process.env.AWS_ACCESS_KEY_ID!, 
       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, 
      }, 
  });

  async getPresignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });
    return await getSignedUrl(this.s3, command, { expiresIn: 3600 }); // 1 hour
  };


  constructor(private prisma: PrismaService,
              private eventEmitter: EventEmitter2
  ) {}


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

  async updateUser(userId: number, file: Express.Multer.File, bio?: string): Promise<User> {
    let key: string | undefined;
    

    if (file){
      const fileName = file.originalname.split('.')[0]; 
      key = `profile-pics/${Date.now()}-${fileName}.webp`;
      //fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}` ;
      // Sử dụng Sharp để: Resize về 400x400, Chuyển sang định dạng WebP (rất nhẹ), Nén chất lượng 80%
      const optimizedImage = await sharp(file.buffer)
      .resize(400, 400, { fit: 'cover' }) // Cắt ảnh vuông đẹp
      .webp({ quality: 80 })              // Định dạng webp nhẹ hơn jpg/png
      .toBuffer();

      await this.s3.send( 
        new PutObjectCommand({ 
          Bucket: process.env.AWS_S3_BUCKET!, 
          Key: key, 
          Body: optimizedImage, 
          ContentType: 'image/webp', }), 
      );

      await this.s3.send( new PutObjectCommand({ Bucket: process.env.AWS_S3_BUCKET!, Key: key, Body: file.buffer, ContentType: file.mimetype, }), );

    }

    const updateData: UpdateUserProfileDto = { 
      bio, 
      profilePic: key, 
    };
    
    
    
    return this.prisma.user.update({
      where:{
        id: userId,
      },
      data: updateData,

    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
