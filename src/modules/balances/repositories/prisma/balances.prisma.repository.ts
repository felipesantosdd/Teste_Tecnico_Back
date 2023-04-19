import { Injectable } from "@nestjs/common";
import { BalancesRepository } from "../balances.repository";
import { PrismaService } from "src/database/prisma.service";
import { Balance } from "../../entities/balance.entity";
import { plainToInstance } from "class-transformer";
import { IBalance, IBalanceCreateRequest } from "../../interfaces";
import AppError from "src/errors/appError";
import fs, { createReadStream } from 'node:fs';
import { parse as csvParse } from "csv-parse"
import { endOfDay, parse, startOfDay } from "date-fns";
import { promises } from 'fs';


@Injectable()
export class BalancesPrismaRepository implements BalancesRepository {


    async create(data: any): Promise<any> {

        const createds = []
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());

        const balancesOnSameDay = await this.prisma.balance.findMany({
            where: {
                AND: [
                    { uploadAt: { gte: todayStart } },
                    { uploadAt: { lte: todayEnd } },
                ],
            },
        });


        data.map(async (ele) => {
            if (!isNaN(ele.value)) {
                const balance = new Balance();

                Object.assign(balance, { ...data, id: balance.id });

                const newBalance = await this.prisma.balance.create({
                    data: {
                        id: balance.id,
                        document: ele.document,
                        value: Number(ele.value),
                        date: ele.date,
                        userId: ele.userId,
                    },
                });

                plainToInstance(Balance, newBalance);
                createds.push(newBalance)

            }
        })

        balancesOnSameDay.map((ele) => {
            this.delete(ele.id)
        })


        return createds;
    }

    async findAll(userId: string): Promise<IBalance[] | []> {
        const balances: any[] = await this.prisma.balance.findMany({
            where: { userId }
        })
        plainToInstance(Balance, balances)

        return balances
    }

    async findOneById(userId: string, id: string): Promise<IBalance> {
        const balance: any = await this.prisma.balance.findFirst({
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

    async loadCSV(userId: string, file: Express.Multer.File): Promise<any> {
        return new Promise((resolve, reject) => {
            const stream = createReadStream(file.path)
            const balances = []

            const parsefile = csvParse()
            stream.pipe(parsefile)

            parsefile
                .on('data', async (line) => {
                    const [date, document, value] = line.toString().split(';')

                    balances.push({
                        userId: userId,
                        document: document,
                        date: date,
                        value: value,
                    });
                })
                .on('end', () => {
                    promises.unlink(file.path);
                    this.create(balances)
                    resolve(balances);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    constructor(private prisma: PrismaService) { }
    import(userId: string, file: Express.Multer.File): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // async import(userId: string, file: Express.Multer.File): Promise<void> {
    //     const balances = await this.loadCSV(userId, file);
    //     const balancesFormated = [];

    //     balances.forEach((ele) => {
    //         try {
    //             const parsedDate = parse(
    //                 ele.data_do_lancamento_financeiro,
    //                 'dd/MM/yyyy',
    //                 new Date()
    //             );

    //             if (isNaN(parsedDate.getTime())) {
    //                 throw new Error('Invalid date format');
    //             }

    //             balancesFormated.push({
    //                 document: ele.documento_recebedor,
    //                 value: ele.valor,
    //                 date: parsedDate.toISOString(),
    //             });
    //         } catch (err) {
    //             console.error(`Error parsing date "${ele.data_do_lancamento_financeiro}": ${err}`);
    //         }
    //     });
    // }

}