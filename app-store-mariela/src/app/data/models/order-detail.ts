export interface OrderDetail {
    id: number;
    quantity: number;
    subtotal: number;
    productId: number;
    orderId: number;
    creatAt: Date;
    updateAt: Date;
    isDelete: boolean;
}