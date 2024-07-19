import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthenticatedRequest } from 'src/auth/authenticated-request.interface';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createPostDto: CreatePostDto, @Request() req: AuthenticatedRequest) {
        return this.postsService.create(createPostDto, req.user);
    }

    @Get()
    findAll(@Query('skip') skip: string, @Query('take') take: string, @Query('title') title: string) {
        const skipNumber = parseInt(skip);
        const takeNumber = parseInt(take);
        return this.postsService.findAll({
            skip: isNaN(skipNumber) ? undefined : skipNumber,
            take: isNaN(takeNumber) ? undefined : takeNumber,
            title,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'user')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req: AuthenticatedRequest) {
        return this.postsService.update(+id, updatePostDto, req.user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}