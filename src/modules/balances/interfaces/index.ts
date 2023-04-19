export interface IBalanceCreateRequest {

    document: string;
    value: number;
    date: string;
}

export interface IBalance {
    id: string;
    document: string;
    value: number;
    date: Date;
    uploadAt: Date;
    userId: string;
}