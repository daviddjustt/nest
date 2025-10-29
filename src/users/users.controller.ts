import { Controller, Get, Param, Patch, Post, Body, Delete, Query } from '@nestjs/common';

@Controller('users') // Handle users route
export class UsersController {
    @Get() // /users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return []
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id } 
    }

    @Post() // Lemos o BODYREQUEST, ele recebe um obj user
    create(@Body() user: {}) { 
        return user
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate }
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return { id } // Retorna um obj com o id especificado 
    }
}
