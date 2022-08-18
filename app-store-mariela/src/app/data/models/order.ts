export interface Order {
    id: number;
    total: number;
    status: number;
    creatAt: Date;
    updateAt: Date;
    isDelete: boolean;
}