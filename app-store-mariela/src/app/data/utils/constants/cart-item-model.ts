import { Product } from "@data/models/product";

export class CartItemModel{
    productId: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    index: number;
    idOrderDetail: number;
    idOrder: number;

    constructor(product: Product, productQuantity: number, index: number, idOrderDetail: number){
        this.productId = product.id;
        this.productName = product.name;
        this.productPrice = product.price;
        this.productQuantity = productQuantity;
        this.index = index;
        this.idOrderDetail= idOrderDetail;
    }
}