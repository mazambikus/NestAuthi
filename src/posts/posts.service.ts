import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) {}

    create(createPostDto: CreatePostDto, user: any) {
        return this.prisma.post.create({
            data: {
                ...createPostDto,
                userId: user.userId,
            },
        });
    }

    findAll(params: { skip?: number; take?: number; title?: string }) {
        const { skip, take, title } = params;
        return this.prisma.post.findMany({
            skip,
            take,
            where: {
                title: title ? { contains: title, mode: 'insensitive' } : undefined,
            },
            orderBy: { createdAt: 'desc' }, // По умолчанию сортировка по дате создания
        });
    }

    async findOne(id: number) {
        const post = await this.prisma.post.findUnique({ where: { id } });
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    async update(id: number, updatePostDto: UpdatePostDto, currentUser: any) {
        const post = await this.prisma.post.findUnique({ where: { id } });
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        if (post.userId !== currentUser.userId && currentUser.role !== 'admin') {
            throw new UnauthorizedException();
        }
        return this.prisma.post.update({
            where: { id },
            data: updatePostDto,
        });
    }

    remove(id: number) {
        return this.prisma.post.delete({ where: { id } });
    }
}
