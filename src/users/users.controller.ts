import { Controller, Get, Param, Patch, Post, Body, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users') // Handle users route
export class UsersController {
    constructor (private readonly userService : UsersService) {
        //
    }

    @Get() // /users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.userService.findAll(role)
        }
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id) // Todos os parâmteros são string, mas o "+" no id, resolve isso 
    }

    @Post() // Lemos o BODYREQUEST, ele recebe um obj user
    create(@Body() createUser: CreateUserDto) { 
        return this.userService.create(createUser)
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUser : UpdateUserDto,
    ) {
        return this.userService.update(id, updateUser)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}
