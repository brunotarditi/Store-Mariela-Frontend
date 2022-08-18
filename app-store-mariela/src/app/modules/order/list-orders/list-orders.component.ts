import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from '@data/models/order';
import { OrderService } from '@data/services/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  text = 'Pedidos';
  @ViewChild(MatTable) myTable!: MatTable<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  order: Order;
  displayedColumns: string[];
  dataSource: MatTableDataSource<Order>;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private orderService: OrderService,
    private router: Router) {
    this.displayedColumns = ['id', 'total', 'status', 'actions']
  }

  ngOnInit(): void {
    this.getOrders();
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }


  getOrders(): void {
    this.orderService.getAllOrders().subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource<Order>(data);
      this.dataSource.filterPredicate = (data: any,  filter: string) => {
        return data.name.trim().toLowerCase().indexOf(filter) !== -1
      }
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    },
      err => {
        console.log(err)
      },
  );
}

  addOrder(): void {
    let order: Order = {id:0, total: 0, status: 0, creatAt: new Date(), updateAt: new Date(), isDelete: false}
    this.orderService.saveOrder(order).subscribe(data => {
        console.log(data);
        
      });
        this.getOrders();
        this.myTable.renderRows();
        this.dataSource._updateChangeSubscription();
  }

  goToDetail(index: number) {
    this.router.navigate(['/dashboard/inventory/detail/' + index]);
  }

  addDetail(index: number){
    this.router.navigate(['/dashboard/orders/new']);
  }

}
