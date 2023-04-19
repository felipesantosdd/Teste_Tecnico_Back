import { randomUUID } from 'node:crypto'

export class Balance {
    readonly id: string;
    document: string;
    value: number;
    date: string;
    uploadAt?: Date;
    deletedAt?: Date | null;
    userId?: string;

    constructor() {
        this.id = randomUUID()
    }
}

