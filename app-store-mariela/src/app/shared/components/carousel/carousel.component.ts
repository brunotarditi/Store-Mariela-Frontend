import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { CarouselItem } from '@data/utils/carousel-item';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {

  @Input() height: number = 500;
  @Input() isFullScreen: boolean = false;
  @Input() items: CarouselItem [] = [];
  finalHeight: string | number = 0;
  currentPosition: number = 0;

  constructor() {
    this.finalHeight = this.isFullScreen ? '100vh': `${this.height}px`;

  }

  ngOnInit(): void {
    this.items.map((elem, index) => {
      elem.id = index;
      elem.marginLeft = 0;
    });
    setInterval(() => {
      this.setNext()
    }, 3000)
  }

  setNext(): void{
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length -1) {
      finalPercentage = this.calculate(nextPosition);
    }else{
      nextPosition = 0;
    }
    this.items.find(elem => elem.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack(): void{
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0) {
      finalPercentage = this.calculate(backPosition);
    }else{
      backPosition = this.items.length - 1;
      finalPercentage = this.calculate(backPosition);
    }
    this.items.find(elem => elem.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }

  setCurrentPosition(position: number): void{
    this.currentPosition = position;
    this.items.find(elem => elem.id === 0)!.marginLeft = this.calculate(position)
  }

  calculate(elem: number): number{
    return -100 * elem;
  }

}
