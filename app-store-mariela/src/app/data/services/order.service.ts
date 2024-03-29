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
     * @returns all orders
     */
    getAllOrdersEnabledWithDetails(): Observable<any> {
        const response = { error: false, msg: '', data: null };
        return this.http.get<any>(this.apiUrl + RequestMapping.ORDER + '/allEnabledWithDetails', { headers: this.header })
    }

    /**
     * 
     * @param order 
     * @returns save one order
     */
    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiUrl + RequestMapping.ORDER + '/save', order, { headers: this.header });
    }

    /**
     * 
     * @param id 
     * @param order 
     * @returns update one order
     */
    updateOrder(id:number, order: Order): Observable<Order>{
        return this.http.put<Order>(this.apiUrl + RequestMapping.ORDER + '/' + id, order, { headers: this.header });
    }

    /**
     * 
     * @param id 
     * @param order 
     * @returns update one order
     */
    getOrder(id:number): Observable<Order>{
        return this.http.get<Order>(this.apiUrl + RequestMapping.ORDER + '/' + id, { headers: this.header });
    }

    /**
     * 
     * @param id
     * @returns delete one order
     */
    deleteProduct(id:number): Observable<any> {
        return this.http.delete<any>(this.apiUrl + RequestMapping.ORDER + '/delete/' + id, { headers: this.header });
    }

}