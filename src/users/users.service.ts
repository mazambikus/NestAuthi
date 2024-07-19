import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
    }

    findAll(params: { skip?: number; take?: number; email?: string }) {
        const { skip, take, email } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            where: {
                email: email ? { contains: email, mode: 'insensitive' } : undefined,
            },
            orderBy: { createdAt: 'desc' }, // По умолчанию сортировка по дате создания
        });
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto, currentUser: any) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        if (user.id !== currentUser.userId && currentUser.role !== 'admin') {
            throw new UnauthorizedException();
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
