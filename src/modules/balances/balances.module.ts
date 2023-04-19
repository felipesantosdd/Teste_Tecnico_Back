import { PrismaService } from "src/database/prisma.service";
import { BalancesController } from "./balances.controller";
import { BalancesService } from "./balances.service";
import { BalancesRepository } from "./repositories/balances.repository";
import { BalancesPrismaRepository } from "./repositories/prisma/balances.prisma.repository";
import { Module } from "@nestjs/common";

@Module({
    controllers: [BalancesController],
    providers: [
        BalancesService,
        PrismaService, {
            provide: BalancesRepository,
            useClass: BalancesPrismaRepository
        }
    ],
    exports: [BalancesService]
})

export class BalanceModule { }