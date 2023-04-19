import { Injectable } from "@nestjs/common";
import { BalancesRepository } from "../balances.repository";
import { PrismaService } from "src/database/prisma.service";
import { Balance } from "../../entities/balance.entity";
import { plainToInstance } from "class-transformer";
import { IBalance, IBalanceCreateRequest } from "../../interfaces";
import AppError from "src/errors/appError";

@Injectable()
export class BalancesPrismaRepository implements BalancesRepository {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, data: IBalanceCreateRequest): Promise<Balance> {
        const balance = new Balance();
        Object.assign(balance, { ...data, id: balance.id });

        const newBalance = await this.prisma.balance.create({
            data: {
                id: balance.id,
                document: data.document,
                value: data.value,
                date: new Date(data.date),
                userId: userId,
            },
        });

        plainToInstance(Balance, newBalance);

        return newBalance;
    }

    async findAll(userId: string): Promise<IBalance[] | []> {
        const balances: IBalance[] = await this.prisma.balance.findMany({
            where: { userId }
        })
        plainToInstance(Balance, balances)

        return balances
    }

    async findOneById(userId: string, id: string): Promise<IBalance> {
        const balance: IBalance = await this.prisma.balance.findFirst({
            where: { id }
        })

        if (!balance) {
            throw new AppError("Este Registro não existe", 404)
        }

        if (balance.userId !== userId) {
            throw new AppError("Você não tem altorização para acessar Este Registro", 403)
        }


        plainToInstance(Balance, balance)

        return balance
    }

    async delete(id: string): Promise<void> {
        await this.prisma.balance.delete({
            where: { id }
        })
        return
    }



}