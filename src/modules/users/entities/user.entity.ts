import { randomUUID } from 'node:crypto'
import { Exclude } from 'class-transformer';

export class User {
    readonly id: string;
    name: string;
    email: string;

    @Exclude()
    password: string;

    reset_token?: string

    constructor() {
        this.id = randomUUID()
    }
}
