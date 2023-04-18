import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/reset-email-password')
  async sendResetEmailPassword(@Body() body: { email: string, protocol: string, host: string }) {
    const { email } = body;
    const protocol = 'https'
    const host = 'csv-balance.vercel.app'
    await this.usersService.sendResetEmailPassword(email, protocol, host);
    return { message: 'Reset password email sent successfully.' };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/reset-password/:resetToken')
  async resetPassword(@Param('resetToken') resetToken: string, @Body('password') password: string) {
    const result = await this.usersService.resetPassword(password, resetToken);
    return result;
  }

}
