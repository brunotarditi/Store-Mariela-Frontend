export class OrderDetail {
    id: number;
    quantity: number;
    subtotal: number;
    idProduct: number;
    idOrder: number;
    creatAt: Date;
    updateAt: Date;
    isDelete: boolean;

    constructor(quantity: number, subtotal: number, idOrder: number, idProduct: number){
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.idOrder = idOrder;
        this.idProduct = idProduct;
    }
}