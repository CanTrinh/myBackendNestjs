import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PostsService {

   constructor(private prisma: PrismaService,
            
    ) {}
  
  async create(dto: CreatePostDto, userId: number) {
  return this.prisma.post.create({
    data: {
      title: dto.title,
      content: dto.content,
      mediaUrl: dto.mediaUrl,
      authorId: userId, // automatically set from logged-in user
      published: true,
    },
  });
}



  async findAll() {
    return this.prisma.post.findMany({
      include:{
        author: true,
      }
    }
    );
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {id},
      include: {
        author: true,
        comments: true
      }
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
