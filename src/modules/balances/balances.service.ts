import { IBalanceCreateRequest } from './interfaces/index';
import { Injectable } from "@nestjs/common";
import { BalancesRepository } from "./repositories/balances.repository";

@Injectable()
export class BalancesService {
    constructor(private BalancesRepository: BalancesRepository) { }

    create(userId: string, data: IBalanceCreateRequest) {
        return this.BalancesRepository.create(data)
    }

    loadCSV(userId: string, file: Express.Multer.File) {
        return this.BalancesRepository.loadCSV(userId, file)
    }

    import(userId: string, file: Express.Multer.File) {
        return this.BalancesRepository.import(userId, file)
    }

    findAll(userId: string) {
        return this.BalancesRepository.findAll(userId)
    }

    findOneById(userId: string, id: string) {
        return this.BalancesRepository.findOneById(userId, id)
    }

    delete(id: string) {
        return this.BalancesRepository.delete(id)
    }
}
























