import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { randomUUID } from 'crypto';
import { EmailService } from 'src/utils/sendEmail.utils';
import AppError from 'src/errors/appError';
import { hashSync } from 'bcryptjs';

@Injectable()
class UsersService {
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
    return this.UsersRepository.update(id, updateUserDto)
  }

  remove(id: string) {
    return this.UsersRepository.delete(id)
  }

  findByEmail(email: string) {
    const user = this.UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User not Found", 404)
    }

    return user;
  }

  async sendResetEmailPassword(email: string, protocol: string, host: string) {
    const user = await this.UsersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const reset_token = randomUUID()

    await this.UsersRepository.update(user.id, { reset_token } as UpdateUserDto);


    const resetPasswordTemplate = EmailService.resetPasswordTemplate(email, user.name, protocol, host, reset_token)

    await EmailService.sendEmail(resetPasswordTemplate)

  }

  async resetPassword(password: string, resetToken: string) {
    const user = await this.UsersRepository.findByResetToken(resetToken)

    if (!user) {
      throw new AppError("User not found", 404)
    }

    await this.UsersRepository.update(user.id, { password: hashSync(password, 10) })
  }


}


export { UsersService }