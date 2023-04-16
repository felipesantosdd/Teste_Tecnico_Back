import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private UsersRepository: UsersRepository) {
  }

  create(createUserDto: CreateUserDto) {
    return this.UsersRepository.create(createUserDto)
  }

  findAll() {
    return this.UsersRepository.findAll()
  }

  findOne(id: string) {
    return this.UsersRepository.findOneById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UsersRepository.update(id, UpdateUserDto)
  }

  remove(id: string) {
    return this.UsersRepository.delete(id)
  }
}
