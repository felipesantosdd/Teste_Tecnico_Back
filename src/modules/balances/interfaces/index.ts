export interface IBalanceCreateRequest {

    document: string;
    value: number;
    date: string;
}

export interface IBalance {
    id: string;
    document: string;
    value: number;
    date: string;
    uploadAt: Date;
    deletedAt?: Date;
    userId: string;
}