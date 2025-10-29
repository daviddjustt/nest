import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Torna todos os campos opcionais automaticamente
export class UpdateUserDto extends PartialType(CreateUserDto) {}

