import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @UseGuards(AuthGuard)
  @Post() 
  async create(@Body() dto: CreatePostDto, @Req() req) { 
    console.log(req.user);
    const userId = req.user.sub; // logged-in user ID from JWT 
    return this.postsService.create(dto, userId); 
    }

  //@UseGuards(AuthGuard)
  @Get()
  /*findAll(@Request() req) {
    // req.user is the JWT payload 
    return {
      message: 'Posts retrieved successfully', 
      user: req.user };
    //return this.postsService.findAll();
  }*/
  async findAll() {
     return this.postsService.findAll(); // ✅ returns an array 
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard, RolesGuard) 
  @Roles('ADMIN', 'MOD')
  @Delete(':id') 
  remove(@Param('id') id: string) { 
    return { message: `Post ${id} deleted successfully` }; 
  }
  
  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }*/
}
