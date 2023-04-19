import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UserPrismaRepository } from './repositories/prisma/users.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';
import { EmailService } from 'src/utils/sendEmail.utils';



@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService, {
      provide: UsersRepository,
      useClass: UserPrismaRepository
    },
    EmailService,
  ],
  exports: [UsersService]
})
export class UsersModule { }
