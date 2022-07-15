//imports
import { TitleH1Component } from "./components/titles/title-h1/title-h1.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { TitleBottomComponent } from "./components/titles/title-bottom/title-bottom.component";
import { DialogComponent } from "./components/dialog/dialog.component";
//exports
export * from './components/titles/title-h1/title-h1.component';
export * from './components/carousel/carousel.component';
export * from './components/titles/title-bottom/title-bottom.component';
export * from './components/dialog/dialog.component';

export const components: any[] = [
    TitleH1Component,
    CarouselComponent,
    TitleBottomComponent,
    DialogComponent
];