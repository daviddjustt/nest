import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enum/user-role.enum';

@Injectable()
export class UsersService {
    // Propriedade privada para guardar os usuários
    private users = [
        {
            "id": 1,
            "name": "David Just",
            "email": "daviddjustt@gmail.com",
            role : UserRole.ADMIN
        },
        {
            "id": 2,
            "name": "David Just Valença",
            "email": "jdevalenca@gmail.com",
            role : UserRole.ADMIN
        },
    ];

    // Método para retornar todos os usuários
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users;
    }

    // Método para retornar um usuário específico
    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user
    }

    // Método para criar um novo usuário
    create(createUserDto: CreateUserDto): User {
        // Ordena por ID decrescente e pega o primeiro (maior ID)
        const userByHighID = [...this.users].sort((a, b) => b.id - a.id);
        
        const newUser: User = {
            id: userByHighID[0].id + 1,
            ...createUserDto
        };
        
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUser: UpdateUserDto): User | null {
        const index = this.users.findIndex(user => user.id === id);
        
        if (index !== -1) {
            Object.assign(this.users[index], updateUser);
            return this.users[index];
        }
        
        return null;
    }

    delete(id: number): User {
        const index = this.users.findIndex(user => user.id === id);
        
        if (index === -1) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        
        const deletedUser = this.users[index];
        this.users.splice(index, 1); // Remove do array
        return deletedUser;
    }

    
}
