import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthenticatedRequest } from 'src/auth/authenticated-request.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(@Query('skip') skip: string, @Query('take') take: string, @Query('email') email: string) {
        const skipNumber = parseInt(skip, 10);
        const takeNumber = parseInt(take, 10);
        return this.usersService.findAll({
            skip: isNaN(skipNumber) ? undefined : skipNumber,
            take: isNaN(takeNumber) ? undefined : takeNumber,
            email,
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'user')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req: AuthenticatedRequest) {
        return this.usersService.update(+id, updateUserDto, req.user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
