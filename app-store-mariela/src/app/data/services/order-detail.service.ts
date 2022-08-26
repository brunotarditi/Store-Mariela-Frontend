import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrderDetail } from "@data/models/order-detail";
import { RequestMapping } from "@data/utils/constants/request";
import { Observable } from "rxjs";
import { ApiStoreMariela } from "./api-store-mariela";

@Injectable({
    providedIn: 'root'
})

export class OrderDetailService extends ApiStoreMariela {

    constructor(http: HttpClient) {
        super(http);
    }
    /**
         * 
         * @param productId 
         * @param orderDetail 
         * @returns add one item
         */
    addToCart(productId: number, orderDetail: OrderDetail): Observable<any> {
        return this.http.post<any>(this.apiUrl + RequestMapping.ORDER_DETAIL + '/addToCart/' + productId, orderDetail, { headers: this.header });
    }

    /**
    * 
    * @param id
    * @returns delete one item
    */
    deleteToCart(id: number): Observable<any> {
        return this.http.delete<any>(this.apiUrl + RequestMapping.ORDER_DETAIL + '/deleteToCart/' + id, { headers: this.header });
    }

}