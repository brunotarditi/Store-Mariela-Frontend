import { StockControl } from "./stock-control";

export interface Product {
    id: number;
    name: string;
    price: number;
    brandId: number;
    categoryId: number;
    stockControl: StockControl;
    creatAt: Date;
    updateAt: Date;
}
