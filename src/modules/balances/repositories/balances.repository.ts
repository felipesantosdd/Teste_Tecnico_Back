import { Balance } from "../entities/balance.entity";
import { IBalance, IBalanceCreateRequest } from "../interfaces";

export abstract class BalancesRepository {
    abstract create(userId: string, data: IBalanceCreateRequest): Promise<Balance>;
    abstract findAll(userId: string): Promise<IBalance[]> | []
    abstract findOneById(userId: string, id: string): Promise<IBalance>
    abstract delete(id: string): Promise<void>
}