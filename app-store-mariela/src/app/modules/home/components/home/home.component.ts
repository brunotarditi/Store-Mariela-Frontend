import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA } from '@data/utils/carousel';
import { CarouselItem } from '@data/utils/carousel-item';
import { StorageService } from '@shared/services/storage.service';
import { ThemeService } from '@shared/services/theme.service';

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
