import { Component, OnInit } from '@angular/core';
import { Info } from '@data/utils/interfaces/info';
import { INFO_DATA } from '@data/utils/info-data';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  text: string = "Bienvenido a la administración"
  infos: Info[] = INFO_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
