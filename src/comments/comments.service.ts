import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {

  constructor(private prisma: PrismaService){

  }
  async create(dto: CreateCommentDto, postid: number,userid: number, ) {
    return this.prisma.comment.create({
      data:{
        content: dto.content, 
        userId: userid,
        postId: postid 
      },
    });
  }

  //find many comments in a post
  findAll(postId: number) {
    return this.prisma.comment.findMany({
      where:{ postId: postId},
      include: {
        user: true
      }
    });
  }

  findOne(id: number) {
    
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
