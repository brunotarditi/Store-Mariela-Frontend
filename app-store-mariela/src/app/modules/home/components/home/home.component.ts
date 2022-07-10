import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA } from '@data/utils/carousel-data';
import { CarouselItem } from '@data/utils/interfaces/carousel-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carousel: CarouselItem[] = CAROUSEL_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
