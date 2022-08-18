import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "@data/models/order";
import { RequestMapping } from "@data/utils/constants/request";
import { Observable } from "rxjs";
import { ApiStoreMariela } from "./api-store-mariela";

@Injectable({
    providedIn: 'root'
})

export class OrderService extends ApiStoreMariela {

    constructor(http: HttpClient) {
        super(http);
    }

    /**
     * 
     * @returns all orders
     */
    getAllOrders(): Observable<Order[]> {
        const response = { error: false, msg: '', data: null };
        return this.http.get<Order[]>(this.apiUrl + RequestMapping.ORDER + '/all', { headers: this.header })
    }

    /**
     * 
     * @param order 
     * @returns save one order
     */
    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiUrl + RequestMapping.ORDER + '/save', order, { headers: this.header });
    }

}