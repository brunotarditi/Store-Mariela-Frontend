//imports
import { TitleH1Component } from "./components/titles/title-h1/title-h1.component";
import { CarouselComponent } from "./components/carousel/carousel/carousel.component";
//exports
export * from './components/titles/title-h1/title-h1.component';
export * from './components/carousel/carousel/carousel.component';

export const components: any[] = [
    TitleH1Component,
    CarouselComponent
];