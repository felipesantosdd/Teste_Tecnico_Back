import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users.repository";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "../../entities/user.entity";
import { plainToInstance } from "class-transformer"
import { UpdateUserDto } from "../../dto/update-user.dto";

@Injectable()
export class UserPrismaRepository implements UsersRepository {

    constructor(private prisma: PrismaService) { }

    async create(data: CreateUserDto): Promise<User> {
        const user = new User();

        console.log(user)

        Object.assign(user, {
            ...data
        })

        const newUser = await this.prisma.user.create({
            data: { ...data, id: user.id }
        })
        return plainToInstance(User, newUser)
    }


    async findAll(): Promise<User[]> {
        const users: User[] = await this.prisma.user.findMany()
        return plainToInstance(User, users)
    }


    async findOneById(id: string): Promise<User> {
        const user: User = await this.prisma.user.findUnique({
            where: { id }
        })
        return plainToInstance(User, user)
    }


    async update(id: string, data: UpdateUserDto): Promise<User> {
        const user: User = await this.prisma.user.update({
            where: { id },
            data: { ...data }
        })

        console.log(data)

        return plainToInstance(User, user)

    }


    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        })
    }

    async findByEmail(email: string): Promise<User> {
        const user: User = await this.prisma.user.findFirst({
            where: {
                email
            },
        });
        return user
    }


    async findByResetToken(token: string): Promise<User> {
        const user: User = await this.prisma.user.findFirst({
            where: {
                reset_token: token
            },
        });
        return user
    }

}
