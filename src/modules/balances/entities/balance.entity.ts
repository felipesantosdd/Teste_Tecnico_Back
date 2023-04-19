import { randomUUID } from 'node:crypto'

export class Balance {
    readonly id?: string;
    document?: string;
    value?: number;
    date?: Date;
    uploadAt?: Date;
    userId?: string;

    constructor() {
        this.id = randomUUID()
    }
}

